import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonLabel,
  IonText,
} from "@ionic/react";
import { caretBack, wifi } from "ionicons/icons";
import useAppStore from "@store/app";
import { useHistory } from "react-router";

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  showStatus?: boolean;
}

const InternetStatus: React.FC<{ isOnline: boolean }> = ({ isOnline }) => (
  <IonLabel
    style={{
      paddingRight: "20px",
      paddingLeft: "20px",
      fontSize: "14px",
      color: "white",
      display: "flex",
      alignItems: "center",
    }}
  >
    <IonIcon
      style={{ fontSize: "25px" }}
      icon={isOnline ? wifi : wifi}
      color={isOnline ? "success" : "danger"}
    />
    <IonText style={{ marginLeft: "2px" }}>
      {isOnline ? "Online" : "Offline"}
    </IonText>
  </IonLabel>
);

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  showStatus = false,
}) => {
  const { projectSettings } = useAppStore();
  const internetAccess = projectSettings?.internetAccess || false;

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {showBackButton && <IonBackButton color="white" icon={caretBack} />}
        </IonButtons>
        <IonTitle color="white">{title}</IonTitle>
        <IonButtons slot="end">
          {showStatus && <InternetStatus isOnline={internetAccess} />}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;
