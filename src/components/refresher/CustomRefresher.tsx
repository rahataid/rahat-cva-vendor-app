import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { FC } from "react";
import "./index.scss";

type Props = {
  handleRefresh: (event: CustomEvent<RefresherEventDetail>) => Promise<any>;
  slot?: "fixed" | "top" | "bottom" | "auto" | undefined;
  pullFactor?: number;
  pullMin?: number;
  pullMax?: number;
  mode?: "ios" | "md";
};

const CustomRefresher: FC<Props> = ({
  handleRefresh,
  slot = "fixed",
  pullFactor = 0.4,
  pullMin = 100,
  pullMax = 200,
  mode = "md",
}) => {
  return (
    <>
      <IonRefresher
        slot={slot}
        pullFactor={pullFactor}
        pullMin={pullMin}
        pullMax={pullMax}
        mode={mode}
        onIonRefresh={handleRefresh}
        class="custom-spinner"
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
    </>
  );
};

export default CustomRefresher;
