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
import useCustomToast from "@hooks/use-custom-toast";

type PropTypes = {
  currentUser: any;
  // isLoading: boolean;
};

const Profile = ({ currentUser }: PropTypes) => {
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
  console.log(currentUser);
  const handleCopyClick = (text: string) => {
    copyToClipboard(text);
    showToast("Text copied to clipboard!", "success");
  };
  return (
    <>
      {/* <IonLoading isOpen={isLoading} message={"Syncing..."} /> */}
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={() => hideToast()}
        message={toastMessage}
        duration={2000}
        position="middle"
        color={toastColor}
      />
      <TransparentCard>
        <IonList>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={personOutline}
              slot="start"
              color="primary"
            ></IonIcon>
            <IonLabel>{currentUser?.name || "-"}</IonLabel>
          </IonItem>
          {/* <IonItem>
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
          </IonItem> */}
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={callOutline}
              slot="start"
              color="primary"
            ></IonIcon>
            <IonLabel>{currentUser?.phone || "-"}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={walletOutline}
              slot="start"
              color="primary"
            ></IonIcon>
            <IonLabel>
              {currentUser?.wallet ? cropString(currentUser.wallet) : "-"}
            </IonLabel>

            <IonIcon
              icon={copyOutline}
              onClick={() => handleCopyClick(currentUser?.wallet)}
              style={{ fontSize: "24px", cursor: "pointer" }}
              color="success"
            />
          </IonItem>
        </IonList>
      </TransparentCard>
    </>
  );
};

export default Profile;
