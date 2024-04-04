import { FC } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import TransactionDetails from "@sections/settings/transactions-settings/transactions-details";
import { useParams } from "react-router";
import { useVendorTransactionDetails } from "@api/vendors";

const TransactionsDetailPage: FC = () => {
  const { txHash } = useParams<{ txHash: string }>();

  const { data } = useVendorTransactionDetails(txHash);

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
