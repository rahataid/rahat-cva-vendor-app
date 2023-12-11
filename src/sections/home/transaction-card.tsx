import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import { TransactionItem } from "../../types/transactions";

type PropTypes = {
  transactionsList: TransactionItem[] | null;
};

const TransactionCard = ({ transactionsList }: PropTypes) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {transactionsList?.map((el, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>Transaction Hash: {el?.hash || "-"}</h2>
                <IonNote>
                  Wallet Address: {el?.walletAddress || el.phone || "-"}
                </IonNote>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <IonNote>Tokens: {el?.amount || "-"}</IonNote>
                </div>
                <IonNote>
                  Created At: {new Date(el?.createdAt).toLocaleString() || "-"}
                </IonNote>
                {el?.isOffline ? (
                  <IonChip style={{ color: "red" }}>Offline</IonChip>
                ) : (
                  <IonChip style={{ color: "green" }}>Online</IonChip>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton
          disabled={true}
          expand='block'
          color='blue'
          style={{ marginTop: "1rem" }}>
          View All
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TransactionCard;
