import React from "react";
import { IonButton } from "@ionic/react";
import "./buttons.scss";

interface CustomButtonProps {
  label: string;
  size?: "small" | "default" | "large";
  disabled?: boolean;
  expand?: "block" | "full";
  testId: string;
  onClick: () => void;
}

const OutlinedButton: React.FC<CustomButtonProps> = ({
  expand,
  disabled,
  label,
  size,
  testId,
  onClick,
}) => {
  return (
    <IonButton
      expand={expand}
      disabled={disabled}
      className="ion-margin-top-sm outlined-button button-text-large"
      size={size}
      onClick={onClick}
      data-testid={testId}
    >
      {label}
    </IonButton>
  );
};

export default OutlinedButton;
