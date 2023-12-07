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

type formDataType = {
  phone?: string | null;
  qrCode?: string | null;
  token: string | null;
};

const ChargeBeneficiary = () => {
  const { internetAccess, addTransaction } = useAppStore((state) => ({
    internetAccess: state.internetAccess,
    setClaimId: state.setClaimId,
    addTransaction: state.addTransaction,
  }));

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

  const chargeBeneficiaryPhone = async (data: formDataType) => {
    console.log("CHARGE PHONE CALLED");
    console.log("APP HAS INTERNET ACCESS = ", internetAccess);

    if (!internetAccess) {
      console.log("NO INTERNET ACCESS", data);
      const { phone, token } = data;
      const createdAt = new Date();
      const payload = {
        phone,
        amount: token,
        createdAt,
        status: "NEW",
        isOffline: !internetAccess,
      };
      await addTransaction(payload);
    }
  };

  const chargeBeneficiaryQr = async (data: any) => {
    console.log("CHARGE QR", data);
    console.log("APP HAS INTERNET ACCESS = ", internetAccess);

    if (!internetAccess) {
      console.log("NO INTERNET ACCESS", data);

      const { qrCode, token } = data;
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
      const validErrors = ["Invalid beneficiary", "Not enough balance"];
      const errorMessage = validErrors.includes(error.message)
        ? error.message
        : "Something went wrong. Try again later";
      console.log(
        "CHARGE PHONE BENEFICIARY SERVER ERROR",
        JSON.stringify(error)
      );
      setError("root.serverError", {
        type: "manual",
        message: errorMessage || "Something went wrong! Try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <IonGrid className='charge-container'>
        <IonRow className='charge-form-container'>
          <IonCol size='11' sizeMd='11' sizeLg='11' sizeXl='11'>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle color='light'>Charge Beneficiary</IonCardTitle>
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
        <IonRow className='charge-button-container'>
          <IonCol
            size='11'
            sizeMd='11'
            sizeLg='11'
            sizeXl='11'
            className='charge-button-wrapper'>
            <IonButton
              color='white'
              fill='clear'
              onClick={handleToggle}
              disabled={isSubmitting}>
              {useQrCode ? "Use Phone" : "Use QR"}
            </IonButton>
            <IonButton
              color='white'
              fill='outline'
              expand='block'
              onClick={handleCancel}
              disabled={isSubmitting}>
              Cancel
            </IonButton>
            <IonButton
              type='submit'
              expand='block'
              color='white'
              disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <IonProgressBar
                  type='indeterminate'
                  style={{ width: "60px" }}></IonProgressBar>
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
