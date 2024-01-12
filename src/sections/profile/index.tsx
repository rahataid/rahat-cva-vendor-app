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
  IonLoading,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import "./profile.scss";
import {
  mail,
  person,
  location,
  call,
  wallet,
  copyOutline,
} from "ionicons/icons";
import { copyToClipboard, cropString } from "@utils/helperFunctions";
import { useState } from "react";
import CustomToast from "@components/toast";

type PropTypes = {
  currentUser: any;
  // isLoading: boolean;
};

const Profile = ({ currentUser }: PropTypes) => {
  const [showToast, setShowToast] = useState(false);
  const handleCopyClick = (text: string) => {
    copyToClipboard(text);
    setShowToast(true);
  };
  return (
    <>
      {/* <IonLoading isOpen={isLoading} message={"Syncing..."} /> */}
      <CustomToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Text copied to clipboard!"
        duration={2000}
        position="middle"
      />
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
            <IonLabel>
              {currentUser?.walletAddress
                ? cropString(currentUser.walletAddress)
                : "-"}
            </IonLabel>

            <IonIcon
              icon={copyOutline}
              onClick={() => handleCopyClick(currentUser?.walletAddress)}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          </IonItem>
        </IonList>
      </IonCard>
    </>
  );
};

export default Profile;
