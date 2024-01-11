import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";
import React from "react";

interface DismissibleAlertProps {
  color?: string;
  title: string;
  description: string;
  dismissText?: string;
  onButtonClick: () => void;
  visible?: boolean | null;
}

const DismissibleAlert: React.FC<DismissibleAlertProps> = ({
  color = "primary",
  title,
  description,
  dismissText = "Dismiss",
  onButtonClick,
  visible = false,
}) => {
  const onDismiss = () => {
    onButtonClick();
  };

  return (
    <>
      {visible && (
        <IonItem
          color={color}
          lines="none"
          className={`ion-text-center ion-padding`}
        >
          <IonIcon icon={alertCircleOutline} slot="start" />
          <IonLabel>
            <h2>{title}</h2>
            <p>{description}</p>
          </IonLabel>
          <IonButton
            color="white"
            fill="solid"
            size="small"
            onClick={onDismiss}
          >
            {dismissText}
          </IonButton>
        </IonItem>
      )}
    </>
  );
};

export default DismissibleAlert;
