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
import CustomHeader from "@components/header/customHeader";

const TransactionsListPage: React.FC = () => {
  const { transactions } = useAppStore();
  return (
    <IonPage>
      <CustomHeader title="Transactions List" showStatus showBackButton />
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              color="white"
              icon={caretBack}
              defaultHref="/tabs/settings/transactions"
            ></IonBackButton>
          </IonButtons>
          <IonTitle color="white">Transactions List</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent>
        <TransactionsList data={transactions} />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
