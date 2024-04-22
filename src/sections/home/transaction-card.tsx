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

type Props = {
  transactionsList: IAllTransactions;
  transactionsLoading: boolean;
  enrolledTransactions?: any;
  isEnrolledFetching: boolean;
  referredTransactions?: any;
  isReferredFetching: boolean;
};

const TransactionCard = ({
  transactionsList,
  transactionsLoading,
  enrolledTransactions,
  isEnrolledFetching,
  referredTransactions,
  isReferredFetching,
}: Props) => {
  const history = useHistory();
  const [selectedSegment, setSelectedSegment] = useState("ALL");

  console.log(transactionsList, enrolledTransactions, referredTransactions);

  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
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
          <IonSegmentButton value="ALL">
            <IonLabel className="segment-label">All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="ENROLLED">
            <IonLabel className="segment-label">Enrolled</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="REFERRED">
            <IonLabel className="segment-label">Referred</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {selectedSegment === "ALL" && (
          <HomeTransactionsList
            transactionsList={transactionsList}
            isLoading={transactionsLoading}
          />
        )}
        {selectedSegment === "ENROLLED" && (
          <HomeTransactionsList
            transactionsList={enrolledTransactions}
            isLoading={isEnrolledFetching}
          />
        )}
        {selectedSegment === "REFERRED" && (
          <HomeTransactionsList
            transactionsList={referredTransactions}
            isLoading={isReferredFetching}
          />
        )}

        <IonButton
          disabled={false}
          expand="block"
          color="primary"
          className="view-all-btn-padding"
          onClick={() => history.push("/tabs/transactions")}
        >
          View All
        </IonButton>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
