import {
  IonButton,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
  isPlatform,
} from "@ionic/react";

import useAppStore from "@store/app";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";
import {
  findObjectInArray,
  isObjectInArray,
  validateTokenAmount,
} from "@utils/helperFunctions";
import {
  createContractInstance,
  getMetaTxRequest,
  getWalletUsingMnemonic,
  validateWalletAddress,
} from "@utils/web3";
import VendorsService from "@services/vendors";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { ITransactionItem, Status } from "../../types/transactions";
import useTransactionStore from "@store/transaction";
import useBeneficiaryStore from "@store/beneficiary";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { FormInputType, formDataType } from "../../types/chargeBeneficiary";
import { HDNodeWallet } from "ethers";

const ChargeBeneficiary = ({ data }: any) => {
  const {
    projectSettings: {
      internetAccess,
      contracts: { CVAProject, ERC2771Forwarder },
      network: { rpcUrl },
    },
    wallet,
    chainData: { allowance },
  } = useAppStore();
  const history = useHistory();
  const { transactions } = useTransactionStore();
  const { beneficiaries } = useBeneficiaryStore();

  const [loadingVisible, setLoadingVisible] = useState(false);

  const isPlatformWeb = isPlatform("desktop") || isPlatform("mobileweb");

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      phoneWalletInput: data?.scannerValue ? data?.scannerValue : "",
      token: undefined,
      qrCode: "",
    },
  });

  const handleToggle = () => {
    history.push("/scanner");
  };

  const validateVendorAllowance = (allowance: number) => {
    if (!allowance || allowance <= 0) return false;
    return true;
  };

  const chargeBeneficiary = async (formData: formDataType) => {
    console.log("FORM DATA 1st", formData);
    const { phoneWalletInput: input, token } = formData;

    if (!input || !wallet) return;

    let selectedInput;
    const isInputWalletAddress = validateWalletAddress(input);
    if (!isInputWalletAddress) selectedInput = FormInputType.phone;
    else selectedInput = FormInputType.walletAddress;

    const checkObj = {
      [selectedInput]: input,
      token,
    };

    let selectedBeneficiary;

    if (!internetAccess) {
      // 1. check if beneficiary is valid

      if (!beneficiaries?.length)
        throw new Error("Please sync beneficiaries to charge in offline mode");
      const isValidBeneficiary = isObjectInArray(
        beneficiaries,
        checkObj,
        selectedInput
      );
      if (!isValidBeneficiary) throw new Error("Invalid beneficiary");

      selectedBeneficiary = findObjectInArray(
        beneficiaries,
        checkObj,
        selectedInput
      );

      //  2. check if token amount is valid

      if (!validateVendorAllowance(+allowance))
        throw new Error("Not enough vendor balance");
      if (
        !validateTokenAmount(
          selectedBeneficiary,
          checkObj,
          selectedInput,
          transactions
        )
      )
        throw new Error("Not enough beneficiary balance");

      //  3. transfer data to the OTP page

      const transactionPayload: ITransactionItem = {
        amount: token,
        createdAt: Date.now(),
        status: Status.NEW,
        isOffline: !internetAccess,
        phone: selectedBeneficiary.phone,
        walletAddress: selectedBeneficiary.walletAddress,
        vendorWalletAddress: wallet?.address,
      };
      history.push("/otp", {
        data: { transactionPayload, selectedBeneficiary, internetAccess },
      });
    } else {
      selectedBeneficiary = findObjectInArray(
        beneficiaries,
        checkObj,
        selectedInput
      );
      let transactionPayload: ITransactionItem;
      if (selectedInput === "phone") {
        transactionPayload = {
          amount: token,
          createdAt: Date.now(),
          status: Status.NEW,
          isOffline: !internetAccess,
          phone: input,
          vendorWalletAddress: wallet?.address,
        };
      } else {
        transactionPayload = {
          amount: token,
          createdAt: Date.now(),
          status: Status.NEW,
          isOffline: !internetAccess,
          walletAddress: input,
          vendorWalletAddress: wallet?.address,
        };
      }
      const walletInstance = getWalletUsingMnemonic(
        (wallet as HDNodeWallet)?.mnemonic?.phrase as string
      );

      const CVAContractInstance = await createContractInstance(
        rpcUrl,
        CVAProject
      );

      const ForwarderContractInstance = await createContractInstance(
        rpcUrl,
        ERC2771Forwarder
      );

      const metaTxRequest = await getMetaTxRequest(
        walletInstance,
        ForwarderContractInstance,
        CVAContractInstance,
        "requestTokenFromBeneficiary(address, uint256)",
        [selectedBeneficiary?.walletAddress, token]
      );

      const payload = {
        ...metaTxRequest,
        gas: metaTxRequest.gas.toString(),
        nonce: metaTxRequest.nonce.toString(),
        value: metaTxRequest.value.toString(),
      };

      await VendorsService.executeMetaTxRequest({
        metaTxRequest: payload,
      });

      history.push("/otp", {
        data: {
          transactionPayload,
          selectedBeneficiary,
          internetAccess,
          selectedInput,
        },
      });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setLoadingVisible(true);
      await chargeBeneficiary(data);
      setLoadingVisible(false);
    } catch (error: any) {
      setLoadingVisible(false);
      console.log(error);

      // const validErrors = [
      //   "Invalid beneficiary",
      //   "Invalid Beneficiary Address",
      //   "Not enough balance",
      //   "Please sync beneficiaries to charge in offline mode",
      // ];
      // const errorMessage = validErrors.includes(error.message)
      //   ? error.message
      //   : "Something went wrong. Try again later";

      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
      });
    }
  };

  const stopScan = async () => {
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    toggleWrapper(false);

    await BarcodeScanner.removeAllListeners();

    await BarcodeScanner.stopScan();
  };

  const toggleWrapper = (data: boolean) => {
    const wrapper = document.getElementById("wrapper");
    if (!wrapper) return;
    if (data) {
      wrapper.style.display = "block";
    } else wrapper.style.display = "none";
  };

  useEffect(() => {
    if (!isPlatformWeb) stopScan();
  }, []);

  return (
    <>
      <IonLoading
        mode="md"
        isOpen={loadingVisible}
        message={"Please wait..."}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <IonGrid className="charge-container">
          <IonRow className="charge-form-container">
            <IonCol size="11" sizeMd="12" sizeXs="12" sizeLg="11" sizeXl="11">
              <TransparentCard>
                <IonCardHeader>
                  <ChargePhone
                    getValues={getValues}
                    errors={errors}
                    setValue={setValue}
                    control={control}
                  />
                </IonCardHeader>
              </TransparentCard>
            </IonCol>
          </IonRow>
          <IonRow className="charge-button-container">
            <IonCol
              size="11"
              sizeMd="11"
              sizeLg="11"
              sizeXl="11"
              className="charge-button-wrapper"
            >
              {!isPlatformWeb && (
                <IonButton
                  mode="md"
                  color="dark"
                  fill="outline"
                  onClick={handleToggle}
                  disabled={isSubmitting}
                >
                  "Scan"
                </IonButton>
              )}

              <IonButton
                mode="md"
                type="submit"
                expand="block"
                color="dark"
                disabled={!isValid || isSubmitting}
              >
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default ChargeBeneficiary;
