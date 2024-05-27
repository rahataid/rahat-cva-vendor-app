import { IonCol, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react";
import { EVENT_TYPE, ITransactionItem } from "../../../types/transactions";
import { personAddOutline, swapHorizontalOutline } from "ionicons/icons";
import "./transactions-card.scss";
import { cropString, formatDate } from "@utils/helperFunctions";
import { useTranslation } from "react-i18next";
import { FC } from "react";

type Props = {
  data: ITransactionItem;
};
const TransactionCard: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <IonGrid className="px-0">
      <IonRow>
        <IonCol size="3" className="home-tx-left-col">
          <div className="icon-wrapper-round">
            <IonIcon
              color="primary"
              icon={
                data?.eventType === EVENT_TYPE.CLAIM_PROCESSED
                  ? swapHorizontalOutline
                  : personAddOutline
              }
              // color={
              //   el?.beneficiaryType ===
              //   BENEFICIARY_TYPE.REFERRED
              //     ? "success"
              //     : "warning"
              // }
            ></IonIcon>
          </div>
          {/* {data?.beneficiaryType === BENEFICIARY_TYPE.REFERRED ? (
            <IonText className="transaction-icon-label" color="success">
              <p>Referred</p>
            </IonText>
          ) : (
            <IonText className="transaction-icon-label" color="warning">
              <p>Enrolled</p>
            </IonText>
          )} */}
        </IonCol>
        <IonCol size="9" className="home-tx-right-col">
          <IonText>
            <h2>
              {data?.eventType === EVENT_TYPE.CLAIM_PROCESSED
                ? t("GLOBAL.TEXTS.EVENT_TYPE.CLAIM_PROCESSED")
                : t("GLOBAL.TEXTS.EVENT_TYPE.BENEFICIARY_REFERRED")}
            </h2>
            <p>{data?.beneficiary ? cropString(data?.beneficiary) : "-"}</p>
            <p>
              {data?.transactionHash ? cropString(data?.transactionHash) : "-"}
            </p>
            <p>
              {data?.blockTimestamp ? formatDate(data?.blockTimestamp) : "-"}
            </p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TransactionCard;
