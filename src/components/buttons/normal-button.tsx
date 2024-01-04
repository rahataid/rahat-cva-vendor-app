import React from "react";
import { IonButton } from "@ionic/react";
import "./buttons.scss";

interface CustomButtonProps {
  label: string;
  size?: "small" | "default" | "large";
  expand?: "block" | "full";
  testId: string;
  onClick: () => void;
  type?: any;
  disabled?: boolean;
}

const NormalButton: React.FC<CustomButtonProps> = ({
  label,
  size,
  expand,
  testId,
  onClick,
  type,
  disabled,
}) => {
  return (
    <IonButton
      expand={expand}
      className="ion-margin-top-sm primary-button button-text-large"
      size={size}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      type={type}
    >
      {label}
    </IonButton>
  );
};

export default NormalButton;
