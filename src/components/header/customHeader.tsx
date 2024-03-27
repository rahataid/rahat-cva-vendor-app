import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonImg,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import { useHistory } from "react-router";
import Logo from "@assets/images/logo/rahat-symbol.png";
import "./customheader.scss";

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
    <IonHeader mode="md" className="custom-toolbar">
      <IonToolbar>
        <IonButtons slot="start">
          {showBackButton && <IonBackButton icon={caretBack} color="primary" />}
        </IonButtons>
        <IonButtons slot="end">
          <IonImg src={Logo} className="header-logo" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default CustomHeader;
