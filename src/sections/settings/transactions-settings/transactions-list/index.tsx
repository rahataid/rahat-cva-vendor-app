import {
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransactionCard from "../transactions-card";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

type Props = {
  data: ITransactionItem[] | [];
};
const TransactionsList = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        <>
          <IonList>
            <IonListHeader>
              <IonLabel>
                <IonText>
                  <p>21/1/2024</p>
                </IonText>
              </IonLabel>
            </IonListHeader>
            {data.map((el, i) => (
              <IonItem key={i}>
                <TransactionCard key={i} transaction={el} />
              </IonItem>
            ))}
            <IonListHeader>
              <IonLabel>
                <IonText>
                  <p>21/1/2024</p>
                </IonText>
              </IonLabel>
            </IonListHeader>
            {data.map((el, i) => (
              <>
                <IonItem key={i}>
                  <TransactionCard key={i} transaction={el} />
                </IonItem>
              </>
            ))}
          </IonList>
        </>
      ) : (
        <TransparentCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              No data available...
            </IonCardTitle>
          </IonCardHeader>
        </TransparentCard>
      )}
    </>
  );
};

export default TransactionsList;
