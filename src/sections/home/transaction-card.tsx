import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

const TransactionCard = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {[1, 2, 3, 4].map((item) => (
            <IonItem key={item}>
              <IonLabel>Transaction {item}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block" color="blue" style={{ marginTop: "1rem" }}>
          View All
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TransactionCard;
