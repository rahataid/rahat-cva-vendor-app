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

type formDataType = {
  phone?: string | null;
  qrCode?: string | null;
  token: string | null;
};

const ChargeBeneficiary = () => {
  const { internetAccess, addTransaction, beneficiaries, transactions } =
    useAppStore((state) => ({
      internetAccess: state.projectSettings?.internetAccess,
      setClaimId: state.setClaimId,
      addTransaction: state.addTransaction,
      beneficiaries: state.beneficiaries,
      transactions: state.transactions,
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
      phone: "",
      token: "",
      qrCode: "",
    },
  });

  const handleToggle = () => {
    setUseQrCode((prev) => !prev);
  };

  const validateTokenAmount = (
    selectedBeneficiary: any,
    formData: formDataType
  ) => {
    const currentBeneficiaryTransactions = transactions.filter(
      (el) => el.phone === formData.phone
    );

    let totalAmount = 0;
    currentBeneficiaryTransactions.forEach((el) => (totalAmount += +el.amount));

    if (formData.token) totalAmount += +formData.token;

    console.log("TOTAL AMOUNT", totalAmount);
    console.log("TOTAL CHARGEABLE AMOUNT", +selectedBeneficiary.token);

    if (totalAmount > +selectedBeneficiary.token) return false;
    return true;
  };

  const chargeBeneficiaryPhone = async (formData: formDataType) => {
    const { phone, token } = formData;
    console.log("INTERNET ACCESS", internetAccess);
    if (!internetAccess) {
      console.log("====", formData, beneficiaries);

      // 1. check if beneficiary is valid

      if (!beneficiaries?.length)
        throw new Error("Please sync beneficiaries to charge in offline mode");
      const isValidBeneficiary = isObjectInArray(beneficiaries, formData);
      if (!isValidBeneficiary) throw new Error("Invalid beneficiary");

      const selectedBeneficiary = findObjectInArray(beneficiaries, formData);

      //  2. check if token amount is valid

      const hasValidTokenAmount = validateTokenAmount(
        selectedBeneficiary,
        formData
      );
      if (!hasValidTokenAmount) throw new Error("Not enough balance");

      //  3. transfer data to the OTP page

      console.log("VALID BENEFICIARY");
      const transactionPayload = {
        amount: token,
        createdAt: Date.now(),
        status: "NEW",
        isOffline: !internetAccess,
        phone,
        walletAddress: selectedBeneficiary.walletAddress,
      };

      history.push("/otp", {
        data: { transactionPayload, selectedBeneficiary },
      });
      // await mutateAsync({ phone, data: payload });
    }
  };

  const chargeBeneficiaryQr = async (data: any) => {
    const { qrCode, token } = data;
    console.log("INTERNET ACCESS", internetAccess);
    if (!internetAccess) {
      const createdAt = new Date();
      const payload = {
        walletAddress: qrCode,
        amount: token,
        createdAt,
        status: "NEW",
        isOffline: !internetAccess,
      };
      await addTransaction(payload);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (useQrCode) await chargeBeneficiaryQr(data);
      else await chargeBeneficiaryPhone(data);
    } catch (error: any) {
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
