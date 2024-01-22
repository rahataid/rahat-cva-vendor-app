import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";

const TransactionsListPage: React.FC = () => {
  const { vendorTransactions } = useTransactionStore();
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
