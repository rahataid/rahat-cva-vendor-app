import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonTextarea,
} from "@ionic/react";

const OTP = () => {
  return (
    <IonGrid className="restore-container">
      <IonRow className="restore-form-container">
        <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
          <IonInput
            label="OTP"
            labelPlacement="floating"
            fill="outline"
            placeholder="Enter OTP"
          ></IonInput>
        </IonCol>
      </IonRow>
      <IonRow className="restore-button-container">
        <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
          <IonButton expand="block">Submit</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default OTP;
