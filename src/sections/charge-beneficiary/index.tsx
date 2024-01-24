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
import { validateWalletAddress } from "@utils/web3";
import VendorsService from "@services/vendors";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { ITransactionItem, Status } from "../../types/transactions";
import useTransactionStore from "@store/transaction";
import useBeneficiaryStore from "@store/beneficiary";

type formDataType = {
  phoneWalletInput?: string | null;
  qrCode?: string | null;
  token: string | null;
};

const ChargeBeneficiary = () => {
  const {
    projectSettings: { internetAccess },
    wallet,
  } = useAppStore();

  const { addTransaction, transactions } = useTransactionStore();
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
      phoneWalletInput: "",
      token: "",
      qrCode: "",
    },
  });

  useIonViewWillLeave(() => {
    setLoadingVisible(false);
  });

  const handleToggle = () => {
    setUseQrCode((prev) => !prev);
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

      const hasValidTokenAmount = validateTokenAmount(
        selectedBeneficiary,
        checkObj,
        selectedInput
      );
      if (!hasValidTokenAmount) throw new Error("Not enough balance");

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

      const { data } = await VendorsService.initiateTransaction({
        vendorAddress: wallet?.address || "",
        beneficiaryAddress: input || "",
        amount: token || "",
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

  const chargeBeneficiaryQr = async (data: any) => {
    const { qrCode, token } = data;
    if (!internetAccess) {
      const payload = {
        walletAddress: qrCode,
        amount: token,
        createdAt: Date.now(),
        status: "NEW",
        isOffline: !internetAccess,
      };
      await addTransaction(payload);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setLoadingVisible(true);
      if (useQrCode) await chargeBeneficiaryQr(data);
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
        message: error.message || "Something went wrong! Try again later.",
      });
    }
  };

  return (
    <>
      <IonLoading isOpen={loadingVisible} message={"Please wait..."} />
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
                color="white"
                fill="clear"
                onClick={handleToggle}
                disabled={isSubmitting}
              >
                {useQrCode ? "Use Phone" : "Use QR"}
              </IonButton>
              <IonButton
                color="white"
                fill="outline"
                expand="block"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </IonButton>
              <IonButton
                type="submit"
                expand="block"
                color="white"
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
