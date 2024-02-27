type Props = {
  status: "SUCCESS" | "PENDING" | "FAILED";
};

import { IonIcon, IonText } from "@ionic/react";
import "./statusChip.scss";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  codeWorkingOutline,
} from "ionicons/icons";

const ResultChip = ({ status }: Props) => {
  return (
    <div className="result-title">
      {status === "SUCCESS" && (
        <>
          <IonIcon size="large" icon={checkmarkCircleOutline} color="success" />
          <IonText color="success">
            <h3 className="m-0">Successful</h3>
          </IonText>
        </>
      )}
      {status === "PENDING" && (
        <>
          <IonIcon size="large" icon={codeWorkingOutline} color="warning" />
          <IonText color="warning">
            <h3 className="m-0">Pending</h3>
          </IonText>
        </>
      )}
      {status === "FAILED" && (
        <>
          <IonIcon size="large" icon={closeCircleOutline} color="danger" />
          <IonText color="danger">
            <h3 className="m-0">Failed</h3>
          </IonText>
        </>
      )}
    </div>
  );
};

export default ResultChip;
