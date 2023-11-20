import {
  IonButton,
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

import "./register.scss";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <IonGrid className="register-container">
      <IonRow className="register-form-container">
        <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
          <IonInput
            label="Full Name"
            labelPlacement="floating"
            fill="solid"
            placeholder="Full Name"
          ></IonInput>
          <br />
          <IonInput
            label="Phone"
            labelPlacement="floating"
            fill="solid"
            placeholder="Phone"
          ></IonInput>
        </IonCol>
      </IonRow>
      <IonRow className="register-button-container">
        <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
          <IonButton expand="block" color="white">
            Submit
          </IonButton>
          <IonRow className="gap-5"></IonRow>
          <IonButton
            color="white"
            fill="outline"
            expand="block"
            onClick={handleCancel}
          >
            Cancel
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Register;
