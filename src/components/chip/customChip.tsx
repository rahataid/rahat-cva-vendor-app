import { IonChip } from "@ionic/react";

type InputProps = {
  color?:
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
  label?: string;
};

import "./customChip.scss";

const CustomChip: React.FC<InputProps> = ({ color, label }) => {
  return (
    <>
      <IonChip className="customChip" color={color}>
        {label}
      </IonChip>
    </>
  );
};

export default CustomChip;
