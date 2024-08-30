import { FC } from "react";
import "./buttons.scss";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { filterOutline } from "ionicons/icons";
import "./floating-button.scss";

interface Props {
  vertical?: "center" | "top" | "bottom";
  horizontal?: "start" | "center" | "end";
  icon?: any;
  disabled?: boolean;
  edge?: boolean;
  mode?: "ios" | "md";
  slot?: "fixed";
  onClick?: () => void;
}

const FloatingButton: FC<Props> = ({
  vertical,
  horizontal,
  icon = filterOutline,
  disabled = false,
  edge = false,
  mode = "md",
  slot = "fixed",
  onClick,
}) => {
  return (
    <IonFab
      slot={slot}
      vertical={vertical}
      horizontal={horizontal}
      edge={edge}
      className="bottom-right-floating-btn"
    >
      <IonFabButton onClick={onClick}>
        <IonIcon icon={icon} mode={mode}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default FloatingButton;
