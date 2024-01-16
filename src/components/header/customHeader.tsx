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
  const { projectSettings } = useAppStore();
  const internetAccess = projectSettings?.internetAccess || false;

  return (
    <IonHeader>
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonBackButton color="white" icon={caretBack} />
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
