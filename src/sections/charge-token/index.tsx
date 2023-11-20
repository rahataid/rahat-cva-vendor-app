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

import "./charge-token.scss";
import { useHistory } from "react-router";
import { useState } from "react";

const ChargeToken = () => {
  const [useQrCode, setUseQrCode] = useState(false);
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

  const handleToggle = () => {
    setUseQrCode((prev) => !prev);
  };
  const handleSubmitPhone = () => {
    console.log("CHARGE PHONE");
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

export default ChargeToken;
