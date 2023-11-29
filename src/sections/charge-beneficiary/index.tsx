import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./charge-beneficiary.scss";
import { useHistory } from "react-router";
import { useState } from "react";
import BeneficiariesService from "@services/beneficiaries";
import { useProject } from "@services/contracts/useProject";
import useAppStore from "@store/app";
import { Controller, useForm } from "react-hook-form";
import TextInputField from "@components/input/form-text-input";
import ChargePhone from "./charge-phone";
import ChargeQr from "./charge-qr";

type formDataType = {
  phone?: string | null;
  qrCode?: string | null;
  token: string | null;
};

const ChargeBeneficiary = () => {
  const [useQrCode, setUseQrCode] = useState(false);
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

  const { getBeneficiaryBalance, requestTokenFromBeneficiary } = useProject();
  const { setClaimId } = useAppStore();

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
    console.log("CHARGE PHONE");
    const { phone, token } = data;
    console.log({ phone, token });
    if (!phone || !token) return;

    //  1.  get beneficiary details
    const {
      data: { rows: beneficiaryData },
    } = await BeneficiariesService.getByPhone(phone);
    console.log({ beneficiaryData });

    //  2.  check if valid beneficiary
    if (beneficiaryData.length === 0) {
      console.log("Invalid Beneficiary");
      throw { message: "Invalid beneficiary" };
    }

    //  3.  get wallet address
    const walletAddress = beneficiaryData[0].walletAddress;
    console.log({ walletAddress });

    //  4.  get beneficiary balance
    const beneficiaryBalance = await getBeneficiaryBalance(walletAddress);
    console.log({ beneficiaryBalance });
    if (beneficiaryBalance == 0) throw { message: "Not enough balance" };

    //  5.  request token from beneficiary
    const claimId = await requestTokenFromBeneficiary(walletAddress, token);
    console.log({ claimId });

    //  6.  Check if claimId is returned
    if (claimId) {
      setClaimId(walletAddress, claimId);
      history.push(`/otp`);
    }
  };

  const chargeBeneficiaryQr = async (data: any) => {
    console.log("CHARGE QR", data);
    const { qrCode, token } = data;

    //  1.  Check if the address is registered as a beneficiary

    const walletAddress = qrCode;
    const allBeneficiary = await BeneficiariesService.getByWalletAddress(
      walletAddress
    );
    const {
      data: { rows: BeneficiaryData },
    } = allBeneficiary;
    if (!BeneficiaryData?.length) {
      throw { message: "Invalid beneficiary" };
    }

    //  2.  Get beneficiary balance
    let beneficiaryBalance = await getBeneficiaryBalance(walletAddress);
    if (beneficiaryBalance == 0) throw { message: "Not enough balance" };

    //  3.  Request token from beneficiary
    const claimId = await requestTokenFromBeneficiary(walletAddress, token);

    //  4.  Check if claimId is returned
    if (claimId) {
      setClaimId(walletAddress, claimId);
      history.push(`/otp`);
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
