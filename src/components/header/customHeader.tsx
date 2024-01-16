// CustomHeader.tsx

import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { caretBack, wifi } from "ionicons/icons";
import useAppStore from "@store/app";
import { useHistory } from "react-router";

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  showStatus?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  showStatus = false,
}) => {
  const {
    projectSettings: { internetAccess },
  } = useAppStore();

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <IonHeader>
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonButton color="white" icon={caretBack} onClick={handleBack} />
          </IonButtons>
        )}
        <IonTitle color="white">{title}</IonTitle>
        {showStatus && (
          <IonButtons slot="end">
            <IonButton color={internetAccess ? "success" : "danger"}>
              <IonIcon icon={internetAccess ? wifi : wifi} />
              {internetAccess ? "Online" : "Offline"}
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;
