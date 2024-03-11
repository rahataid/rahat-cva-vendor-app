import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { ellipsisHorizontal, swapHorizontalOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import "./transactions-card.scss";
import { useHistory } from "react-router";
import { BENEFICIARY_TYPE, IBeneficiary } from "@types/beneficiaries";
import { cropString, formatDate } from "@utils/helperFunctions";

type Props = {
  data: ITransactionItem;
};
const TransactionCard = ({ data }: Props) => {
  return (
    <IonGrid className="px-0">
      <IonRow>
        <IonCol size="3" className="home-tx-left-col">
          <div className="icon-wrapper-round">
            <IonIcon
              icon={swapHorizontalOutline}
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
            <h2>Claim Processed</h2>
            <p>{cropString(data?.beneficiaryAddress) || "-"}</p>
            <p>{cropString(data?.transactionHash) || "-"}</p>
            <p>{formatDate(data?.blockTimestamp) || "-"}</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TransactionCard;
