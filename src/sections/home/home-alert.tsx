import CustomToast from "@components/toast";
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import useAppStore from "@store/app";
import { alertCircleOutline } from "ionicons/icons";
import React, { useState } from "react";

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const {
    projectSettings: { internetAccess },
  } = useAppStore();

  const onDismiss = () => {
    onButtonClick();
  };

  const handleButtonFocus = () => {
    if (!internetAccess) {
      setToastMessage("Must be online to sync");
      setShowToast(true);
    }
  };

  return (
    <>
      <CustomToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="middle"
      />
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
          <div onClick={handleButtonFocus}>
            <IonButton
              color="white"
              fill="solid"
              size="small"
              onClick={onDismiss}
              disabled={!internetAccess}
            >
              {dismissText}
            </IonButton>
          </div>
        </IonItem>
      )}
    </>
  );
};

export default DismissibleAlert;
