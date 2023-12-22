import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransactionCard from "../transactions-card";

type Props = {
  data: [ITransactionItem] | [];
};
const TransactionsList = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map((el, i) => <TransactionCard key={i} transaction={el} />)
      ) : (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              No data available...
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      )}
    </>
  );
};

export default TransactionsList;
