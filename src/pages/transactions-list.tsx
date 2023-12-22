import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import useAppStore from "@store/app";

const TransactionsListPage: React.FC = () => {
  const { transactions } = useAppStore();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              color="white"
              icon={caretBack}
              defaultHref="/tabs/settings/transactions"
            ></IonBackButton>
          </IonButtons>
          <IonTitle className="title-center">Transactions List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TransactionsList data={transactions} />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
