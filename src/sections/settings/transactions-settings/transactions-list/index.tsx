import {
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransactionCard from "../transactions-card";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { useHistory } from "react-router";

type Props = {
  data: ITransactionItem[] | [];
};
const TransactionsList = ({ data }: Props) => {
  const history = useHistory();
  const handleViewDetail = () => {
    history.push("/tabs/settings/transactions/0x23123872349");
  };
  return (
    <>
      {data?.length ? (
        <>
          <TransparentCard>
            <IonList mode="md">
              <IonListHeader>
                <IonLabel>
                  <IonText>
                    <p>21/1/2024</p>
                  </IonText>
                </IonLabel>
              </IonListHeader>
              {data.map((el, i) => (
                <IonItem
                  key={i}
                  button={true}
                  onClick={handleViewDetail}
                  lines="full"
                >
                  <TransactionCard key={i} transaction={el} />
                </IonItem>
              ))}
              <br />
              <IonListHeader>
                <IonLabel>
                  <IonText>
                    <p>21/1/2024</p>
                  </IonText>
                </IonLabel>
              </IonListHeader>
              {data.map((el, i) => (
                <>
                  <IonItem
                    key={i}
                    button={true}
                    onClick={handleViewDetail}
                    lines="full"
                  >
                    <TransactionCard key={i} transaction={el} />
                  </IonItem>
                </>
              ))}
            </IonList>
          </TransparentCard>
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
