import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import { useHistory } from "react-router";

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => Promise<void>;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  onBackButtonClick = null,
}) => {
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
