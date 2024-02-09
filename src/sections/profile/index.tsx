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
  walletOutline,
  copyOutline,
  callOutline,
  locationOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";
import { copyToClipboard, cropString } from "@utils/helperFunctions";
import { useState } from "react";
import CustomToast from "@components/toast";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

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
      <TransparentCard>
        <IonList>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={personOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>{currentUser?.name || "-"}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={mailOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>{currentUser?.email || "-"}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={locationOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>{currentUser?.address?.city || "-"}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={callOutline}
              slot="start"
            ></IonIcon>
            <IonLabel>{currentUser?.phone || "-"}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={walletOutline}
              slot="start"
            ></IonIcon>
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
      </TransparentCard>
    </>
  );
};

export default Profile;
