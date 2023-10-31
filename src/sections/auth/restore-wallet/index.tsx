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
import { useHistory } from "react-router";
import "./restore.scss";

const RestoreWallet = () => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <IonGrid className="restore-container">
      <IonRow className="restore-form-container">
        <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
          <IonList>
            <IonItem>
              <IonTextarea
                label=""
                placeholder="Please enter 12 words pneumonics"
              ></IonTextarea>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
      <IonRow className="restore-button-container">
        <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
          <IonButton expand="block">Submit</IonButton>
          <IonRow className="gap-5"></IonRow>
          <IonButton fill="outline" expand="block" onClick={handleCancel}>
            Cancel
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default RestoreWallet;
