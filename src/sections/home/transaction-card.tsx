import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import { TransactionItem } from "../../types/transactions";

type PropTypes = {
  transactionsList: [TransactionItem] | null;
};

const TransactionCard = ({ transactionsList }: PropTypes) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem key={0}>
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol size="3">Transaction Hash</IonCol>
                  <IonCol size="2">Wallet Address </IonCol>
                  <IonCol size="1">Tokens</IonCol>
                  <IonCol size="1">Status</IonCol>
                  <IonCol size="2">Is Offline</IonCol>
                  <IonCol size="1">Created At</IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
          {transactionsList?.map((el) => (
            <IonItem key={JSON.stringify(el?.createdAt)}>
              <IonLabel>
                <IonGrid>
                  <IonRow>
                    <IonCol>{el?.hash || "-"} </IonCol>
                    <IonCol>{el?.walletAddress || el.phone || "-"}</IonCol>
                    <IonCol>{el?.amount || "-"}</IonCol>
                    <IonCol>{el?.status || "-"}</IonCol>
                    <IonCol>{el?.isOffline ? "true" : "false"}</IonCol>
                    <IonCol>{JSON.stringify(el?.createdAt) || "-"}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton
          disabled={true}
          expand="block"
          color="blue"
          style={{ marginTop: "1rem" }}
        >
          View All
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TransactionCard;
