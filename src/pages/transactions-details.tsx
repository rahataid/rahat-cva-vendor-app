import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import TransactionDetails from "@sections/settings/transactions-settings/transactions-details";
import { useLocation } from "react-router";
import { ITransactionItem } from "@types/transactions";

interface LocationState {
  data: {
    transaction: ITransactionItem;
  };
}

const TransactionsDetailPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Transaction Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionDetails data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsDetailPage;
