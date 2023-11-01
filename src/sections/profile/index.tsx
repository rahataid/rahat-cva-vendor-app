import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./profile.scss";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <IonGrid className="profile-container">
      <IonRow className="profile-form-container">
        <IonCol size="11" sizeMd="11" sizeLg="11" sizeXl="11">
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <p>Vendor 1</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <p>vendor1@email.com</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <p>Ghorepani, Poonhill</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Phone</IonLabel>
              <p>+9779898989898</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Wallet Address</IonLabel>
              <p>0xb794f5ea0ba39494ce839613fffba74279579268</p>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Profile;
