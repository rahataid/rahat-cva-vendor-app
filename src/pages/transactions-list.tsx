import { FC } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  RefresherEventDetail,
} from "@ionic/react";
import TransactionsList from "@sections/transactions/transactions-list";
import CustomHeader from "@components/header/customHeader";
import { useVendorTransaction } from "@api/vendors";
import { useGraphService } from "@contexts/graph-query";
import CustomRefresher from "@components/refresher/CustomRefresher";
import { useTranslation } from "react-i18next";

const TransactionsListPage: FC = () => {
  const { t } = useTranslation();
  const { queryService } = useGraphService();
  // const { data, isLoading, error, refetch, isFetching } =
  //   useVendorTransaction(queryService);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };

  return (
    <IonPage>
      <CustomHeader title={t("TRANSACTIONS_LIST_PAGE.PAGE_TITLE")} />
      <IonContent>
        <CustomRefresher handleRefresh={handleRefresh} />
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionsList data={[]} loading={false} error={null} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
