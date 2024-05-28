import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { IAllTransactions } from "../../types/transactions";
import { useHistory } from "react-router";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import "./home.scss";
import { useState } from "react";
import ListSkeleton from "@components/loaders/skeleton/transactions-list";
import HomeTransactionsList from "./home-transaction-list";
import { useTranslation } from "react-i18next";
import { FC } from "react";

type Props = {
  transactionsList: IAllTransactions;
  transactionsLoading: boolean;
};

const TransactionCard: FC<Props> = ({
  transactionsList,
  transactionsLoading,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [selectedSegment, setSelectedSegment] = useState("ALL");

  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>{t("HOME_PAGE.TITLES.TRANSACTIONS")}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="transactions-container">
        <IonSegment
          swipeGesture={true}
          value={selectedSegment}
          mode="md"
          onIonChange={(e: any) => {
            setSelectedSegment(e.detail.value);
          }}
        >
          {/* <IonSegmentButton value="ALL">
            <IonLabel className="segment-label">
              {t("HOME_PAGE.SEGMENTS.ALL")}
            </IonLabel>
          </IonSegmentButton> 
          <IonSegmentButton value="ENROLLED">
            <IonLabel className="segment-label">
              {t("HOME_PAGE.SEGMENTS.ENROLLED")}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="REFERRED">
            <IonLabel className="segment-label">
              {t("HOME_PAGE.SEGMENTS.REFERRED")}
            </IonLabel>
          </IonSegmentButton> */}
        </IonSegment>

        {selectedSegment === "ALL" && (
          <HomeTransactionsList
            transactionsList={transactionsList}
            isLoading={transactionsLoading}
          />
        )}

        <IonButton
          disabled={false}
          expand="block"
          color="primary"
          className="view-all-btn-padding"
          onClick={() => history.push("/tabs/transactions")}
        >
          {t("HOME_PAGE.BUTTONS.VIEW_ALL")}
        </IonButton>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
