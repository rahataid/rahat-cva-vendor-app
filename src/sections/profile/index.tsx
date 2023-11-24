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

type PropTypes = {
  currentUser: any;
};

const Profile = ({ currentUser }: PropTypes) => {
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
              <p>{currentUser?.name || "-"}</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <p>{currentUser?.email || "-"}</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <p>{currentUser?.address?.city || "-"}</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Phone</IonLabel>
              <p>{currentUser?.phone || "-"}</p>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Wallet Address</IonLabel>
              <p>{currentUser?.walletAddress || "-"}</p>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Profile;
