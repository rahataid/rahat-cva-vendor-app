import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import useAppStore from "@store/app";
import CustomHeader from "@components/header/customHeader";

const TransactionsListPage: React.FC = () => {
  const { transactions } = useAppStore();
  return (
    <IonPage>
      <CustomHeader title="Transactions List" showStatus showBackButton />
      <IonContent>
        <TransactionsList data={transactions} />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
