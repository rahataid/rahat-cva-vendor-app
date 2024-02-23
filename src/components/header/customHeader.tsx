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
  IonButton,
} from "@ionic/react";
import { caretBack, wifi } from "ionicons/icons";
import useAppStore from "@store/app";
import { useHistory } from "react-router";

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => Promise<void>;
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
  onBackButtonClick = null,
}) => {
  const { projectSettings } = useAppStore();
  const internetAccess = projectSettings?.internetAccess || false;

  const history = useHistory();

  const handleBack = () => {
    if (onBackButtonClick) onBackButtonClick();
    history.goBack();
  };

  return (
    <IonHeader mode="md">
      <IonToolbar>
        <IonButtons slot="start">
          {showBackButton && <IonBackButton color="dark" icon={caretBack} />}
        </IonButtons>
        <IonTitle color="dark">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;
