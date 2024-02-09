import React from "react";
import { IonToast } from "@ionic/react";

type ToastPosition = "top" | "bottom" | "middle";

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
  message: string;
  duration: number;
  position: ToastPosition;
}

const CustomToast: React.FC<Props> = ({
  isOpen = false,
  onDidDismiss,
  message,
  duration = 2000,
  position = "top",
}) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      message={message}
      duration={duration}
      position={position}
      className="custom-toast"
      translucent={true}
      mode="md"
    />
  );
};

export default CustomToast;
