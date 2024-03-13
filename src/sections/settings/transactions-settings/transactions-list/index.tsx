import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransactionCard from "../transactions-card";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { useHistory } from "react-router";
import { IBeneficiary } from "@types/beneficiaries";
import { chevronForwardOutline } from "ionicons/icons";
import TransactionSkeleton from "@components/loaders/skeleton/transactions-list";

type Props = {
  data: IBeneficiary[] | [] | any;
  loading: boolean;
  error: any;
};
const TransactionsList = ({ data, loading }: Props) => {
  const history = useHistory();

  console.log();

  if (loading)
    return (
      <TransparentCard>
        <IonCardContent>
          <TransactionSkeleton length={9} />
        </IonCardContent>
      </TransparentCard>
    );

  return (
    <>
      {Object.keys(data)?.length ? (
        <>
          <TransparentCard>
            <IonList mode="md">
              {Object.keys(data).map((key, i) => {
                return (
                  <div key={i}>
                    <IonListHeader>
                      <IonLabel>
                        <IonText>
                          <p>{key}</p>
                        </IonText>
                      </IonLabel>
                    </IonListHeader>
                    <IonCardContent className="transactions-container">
                      {data[key]?.map((el: ITransactionItem, i: number) => (
                        <IonItem
                          key={i}
                          button={true}
                          lines="full"
                          onClick={() =>
                            history.push(`/tabs/transactions/details`, {
                              data: { transaction: el },
                            })
                          }
                        >
                          <TransactionCard data={el} />
                          <IonIcon
                            className="end-icon"
                            icon={chevronForwardOutline}
                            slot="end"
                            color="medium"
                          />
                        </IonItem>
                      ))}
                    </IonCardContent>
                  </div>
                );
              })}
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
