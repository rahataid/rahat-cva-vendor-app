import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";
import useTransactionsStore from "@store/transactions";

const TransactionsListPage: React.FC = () => {
  const { vendorTransactions } = useTransactionsStore();
  return (
    <IonPage>
      <CustomHeader title="Transactions List" showStatus showBackButton />
      <IonContent>
        <TransactionsList data={vendorTransactions} />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
