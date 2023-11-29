import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
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
import { mail, person, location, call, wallet } from "ionicons/icons";

type PropTypes = {
  currentUser: any;
};

const Profile = ({ currentUser }: PropTypes) => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <IonCard>
      <IonList>
        <IonItem>
          <IonIcon aria-hidden="true" icon={person} slot="start"></IonIcon>
          <IonLabel>{currentUser?.name || "-"}</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" icon={mail} slot="start"></IonIcon>
          <IonLabel>{currentUser?.email || "-"}</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" icon={location} slot="start"></IonIcon>
          <IonLabel>{currentUser?.address?.city || "-"}</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" icon={call} slot="start"></IonIcon>
          <IonLabel>{currentUser?.phone || "-"}</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon aria-hidden="true" icon={wallet} slot="start"></IonIcon>
          <IonLabel>{currentUser?.walletAddress || "-"}</IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default Profile;
