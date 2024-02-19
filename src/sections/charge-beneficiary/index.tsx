import {
  IonButton,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
  useIonViewWillLeave,
} from "@ionic/react";

import useAppStore from "@store/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";
import ChargeQr from "./charge-qr";
import { findObjectInArray, isObjectInArray } from "@utils/helperFunctions";
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

type formDataType = {
  phoneWalletInput?: string | null;
  qrCode?: string | null;
  token: number | undefined;
};

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

  const { transactions } = useTransactionStore();
  const { beneficiaries } = useBeneficiaryStore();

  const [loadingVisible, setLoadingVisible] = useState(false);

  const [useQrCode, setUseQrCode] = useState(false);

  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

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

  useIonViewWillLeave(() => {
    setLoadingVisible(false);
  });

  const handleToggle = () => {
    // setUseQrCode((prev) => !prev);
    history.push("/scanner");
  };

  const validateVendorAllowance = (allowance: number) => {
    if (!allowance || allowance <= 0) return false;
    return true;
  };

  const validateTokenAmount = (
    selectedBeneficiary: any,
    formData: formDataType,
    key: string
  ) => {
    const currentBeneficiaryTransactions = transactions.filter(
      (el: any) => el[key] === formData[key]
    );

    let totalAmount = 0;
    currentBeneficiaryTransactions.forEach((el) => (totalAmount += +el.amount));

    if (formData.token) totalAmount += +formData.token;

    if (totalAmount > +selectedBeneficiary.token) return false;
    return true;
  };

  const chargeBeneficiaryPhoneQr = async (formData: formDataType) => {
    const { phoneWalletInput: input, token } = formData;

    let selectedInput;
    const isInputWalletAddress = validateWalletAddress(input);
    if (!isInputWalletAddress) selectedInput = "phone";
    else selectedInput = "walletAddress";

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
      if (!validateTokenAmount(selectedBeneficiary, checkObj, selectedInput))
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
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

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

  const chargeBeneficiaryQr = async () => {
    // IMPLEMENT QR SCAN CODE HERE
  };

  const onSubmit = async (data: any) => {
    try {
      setLoadingVisible(true);
      if (useQrCode) await chargeBeneficiaryQr();
      else await chargeBeneficiaryPhoneQr(data);
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
                  {useQrCode ? (
                    <ChargeQr
                      getValues={getValues}
                      errors={errors}
                      setValue={setValue}
                      control={control}
                    />
                  ) : (
                    <ChargePhone
                      getValues={getValues}
                      errors={errors}
                      setValue={setValue}
                      control={control}
                    />
                  )}
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
              <IonButton
                mode="md"
                color="dark"
                fill="clear"
                onClick={handleToggle}
                disabled={isSubmitting}
              >
                {useQrCode ? "Use Phone" : "Scan"}
              </IonButton>
              <IonButton
                mode="md"
                color="dark"
                fill="outline"
                expand="block"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </IonButton>
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
