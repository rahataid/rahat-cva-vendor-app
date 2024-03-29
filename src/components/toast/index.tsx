import React from "react";
import { IonToast } from "@ionic/react";

type ToastPosition = "top" | "bottom" | "middle";
type ToastColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "medium"
  | "dark"
  | undefined;

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
  message: string;
  duration: number;
  position: ToastPosition;
  color?: ToastColor;
}

const CustomToast: React.FC<Props> = ({
  isOpen = false,
  onDidDismiss,
  message,
  duration = 2000,
  position = "top",
  color = "primary",
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
      color={color}
    />
  );
};

export default CustomToast;
