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
import { useTranslation } from "react-i18next";

const ResultChip = ({ status }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="result-title">
      {status === "SUCCESS" && (
        <>
          <IonIcon size="large" icon={checkmarkCircleOutline} color="success" />
          <IonText color="success">
            <h1 className="m-0">{t("GLOBAL.CHIPS.SUCCESS")}</h1>
          </IonText>
        </>
      )}
      {status === "PENDING" && (
        <>
          <IonIcon size="large" icon={codeWorkingOutline} color="warning" />
          <IonText color="warning">
            <h1 className="m-0">{t("GLOBAL.CHIPS.PENDING")}</h1>
          </IonText>
        </>
      )}
      {status === "FAILED" && (
        <>
          <IonIcon size="large" icon={closeCircleOutline} color="danger" />
          <IonText color="danger">
            <h1 className="m-0">{t("GLOBAL.CHIPS.FAILED")}</h1>
          </IonText>
        </>
      )}
    </div>
  );
};

export default ResultChip;
