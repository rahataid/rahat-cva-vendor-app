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
  IonRow,
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

const ChargeBeneficiary = () => {
  const [useQrCode, setUseQrCode] = useState(false);
  const [phone, setPhone] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

  const { getBeneficiaryBalance, requestTokenFromBeneficiary } = useProject();
  const { setClaimId } = useAppStore();

  const handleToggle = () => {
    setUseQrCode((prev) => !prev);
  };
  const handleSubmitPhone = async () => {
    try {
      console.log("CHARGE PHONE");
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
        return;
      }

      //  3.  get wallet address
      const walletAddress = beneficiaryData[0].walletAddress;
      console.log({ walletAddress });

      //  4.  get beneficiary balance
      const beneficiaryBalance = await getBeneficiaryBalance(walletAddress);
      console.log({ beneficiaryBalance });
      if (beneficiaryBalance == 0) throw "Not enough balance";

      //  5.  request token from beneficiary
      const claimId = await requestTokenFromBeneficiary(walletAddress, token);
      console.log({ claimId });

      //  6.  Check if claimId is returned
      if (claimId) {
        setClaimId(walletAddress, claimId);
        history.push(`/otp`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitQr = () => {
    console.log("CHARGE QR");
  };

  const phoneComponent = (
    <>
      <IonCardSubtitle>
        You are about to send tokens to this beneficiary. Please enter phone
        number of the beneficiary.
      </IonCardSubtitle>
      <IonRow className="gap-25"></IonRow>
      <IonInput
        label="Beneficiary Phone Number"
        labelPlacement="floating"
        fill="outline"
        placeholder="Enter beneficiary phone number"
        onIonInput={(e) => setPhone(e.target.value)}
      ></IonInput>
      <br />
      <IonInput
        label="Token Amount"
        labelPlacement="floating"
        fill="outline"
        placeholder="Enter Token Amount"
        onIonInput={(e) => setToken(e.target.value)}
      ></IonInput>
    </>
  );
  const qrComponent = (
    <>
      <IonCardSubtitle>
        You are about to send tokens to this beneficiary. Please enter QR code
        of the beneficiary.
      </IonCardSubtitle>
      <IonRow className="gap-25"></IonRow>
      <IonInput
        label="Beneficiary QR Code"
        labelPlacement="floating"
        fill="outline"
        placeholder="Enter beneficiary QR code"
      ></IonInput>
      <br />
      <IonInput
        label="Token Amount"
        labelPlacement="floating"
        fill="outline"
        placeholder="Enter Token Amount"
      ></IonInput>
    </>
  );
  const phoneSubmitButton = (
    <IonButton color="white" onClick={handleSubmitPhone}>
      Charge
    </IonButton>
  );
  const qrSubmitButton = (
    <IonButton color="white" onClick={handleSubmitQr}>
      Charge
    </IonButton>
  );

  return (
    <IonGrid className="charge-container">
      <IonRow className="charge-form-container">
        <IonCol size="11" sizeMd="11" sizeLg="11" sizeXl="11">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle color="light">Charge Beneficiary</IonCardTitle>
              {useQrCode ? qrComponent : phoneComponent}
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
          <IonButton color="white" fill="clear" onClick={handleToggle}>
            {useQrCode ? "Use Phone" : "Use QR"}
          </IonButton>
          <IonButton color="white" fill="outline" onClick={handleCancel}>
            Cancel
          </IonButton>
          {useQrCode ? qrSubmitButton : phoneSubmitButton}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ChargeBeneficiary;
