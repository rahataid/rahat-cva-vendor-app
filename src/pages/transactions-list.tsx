import { FC } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  RefresherEventDetail,
} from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";

import { useVendorTransaction } from "@api/vendors";
import { useGraphService } from "@contexts/graph-query";
import CustomRefresher from "@components/refresher/CustomRefresher";

const TransactionsListPage: FC = () => {
  const { queryService } = useGraphService();
  const { data, isLoading, error, refetch } =
    useVendorTransaction(queryService);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };

  return (
    <IonPage>
      <CustomHeader title="Transactions List" />
      <IonContent>
        <CustomRefresher handleRefresh={handleRefresh} />
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
