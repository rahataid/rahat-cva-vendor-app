import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow,
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
import { IBeneficiary } from "@types/beneficiaries";

type formDataType = {
  phoneWalletInput?: string | null;
  qrCode?: string | null;
  token: string | null;
};

const ChargeBeneficiary = () => {
  const {
    internetAccess,
    addTransaction,
    beneficiaries,
    transactions,
    wallet,
  } = useAppStore((state) => ({
    internetAccess: state.projectSettings?.internetAccess,
    setClaimId: state.setClaimId,
    addTransaction: state.addTransaction,
    beneficiaries: state.beneficiaries,
    transactions: state.transactions,
    wallet: state.wallet,
    // setTasks: state.setTasks,
  }));

  // const { mutateAsync } = useChargeBeneficiary();

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
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      phoneWalletInput: "",
      token: "",
      qrCode: "",
    },
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

    console.log("TOTAL AMOUNT", totalAmount);
    console.log("TOTAL CHARGEABLE AMOUNT", +selectedBeneficiary.token);

    if (totalAmount > +selectedBeneficiary.token) return false;
    return true;
  };

  const chargeBeneficiaryPhoneQr = async (formData: formDataType) => {
    console.log("CARGE PHONE QR");
    const { phoneWalletInput: input, token } = formData;

    let selectedInput;
    const isInputWalletAddress = validateWalletAddress(input);
    if (!isInputWalletAddress) selectedInput = "phone";
    else selectedInput = "walletAddress";
    console.log("INTERNET ACCESS", internetAccess);

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
      console.log("SELECTED BENEFICIARY", selectedBeneficiary);
      if (!hasValidTokenAmount) throw new Error("Not enough balance");

      //  3. transfer data to the OTP page

      const transactionPayload = {
        amount: token,
        createdAt: Date.now(),
        status: "NEW",
        isOffline: !internetAccess,
        phone: selectedBeneficiary.phone,
        walletAddress: selectedBeneficiary.walletAddress,
      };

      history.push("/otp", {
        data: { transactionPayload, selectedBeneficiary, internetAccess },
      });
    } else {
      let transactionPayload;
      if (selectedInput === "phone") {
        transactionPayload = {
          amount: token,
          createdAt: Date.now(),
          status: "NEW",
          isOffline: !internetAccess,
          phone: input,
        };
      } else {
        transactionPayload = {
          amount: token,
          createdAt: Date.now(),
          status: "NEW",
          isOffline: !internetAccess,
          walletAddress: input,
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

    // await mutateAsync({ phone, data: payload });
  };

  const chargeBeneficiaryQr = async (data: any) => {
    const { qrCode, token } = data;
    console.log("INTERNET ACCESS", internetAccess);
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
      if (useQrCode) await chargeBeneficiaryQr(data);
      else await chargeBeneficiaryPhoneQr(data);
    } catch (error: any) {
      console.log(error);
      const validErrors = [
        "Invalid beneficiary",
        "Not enough balance",
        "Please sync beneficiaries to charge in offline mode",
      ];
      const errorMessage = validErrors.includes(error.message)
        ? error.message
        : "Something went wrong. Try again later";
      setError("root.serverError", {
        type: "manual",
        message: errorMessage || "Something went wrong! Try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <IonGrid className="charge-container">
        <IonRow className="charge-form-container">
          <IonCol size="11" sizeMd="11" sizeLg="11" sizeXl="11">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle color="light">Charge Beneficiary</IonCardTitle>
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
            </IonCard>
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
              {isSubmitting ? (
                <IonProgressBar
                  type="indeterminate"
                  style={{ width: "60px" }}
                ></IonProgressBar>
              ) : (
                "Submit"
              )}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default ChargeBeneficiary;
