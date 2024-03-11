import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";

import { sortBeneficiariesByDate } from "@utils/helperFunctions";
import useAppStore from "@store/app";
import { useVendorTransaction } from "@api/vendors";
import { useGraphService } from "@contexts/graph-query";

const TransactionsListPage: React.FC = () => {
  const { queryService } = useGraphService();
  const { wallet } = useAppStore();
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useVendorTransaction(wallet?.address, queryService);
  const data = sortBeneficiariesByDate(transactionsData);

  return (
    <IonPage>
      <CustomHeader title="Transactions List" />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionsList data={data} loading={isLoading} error={error} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
