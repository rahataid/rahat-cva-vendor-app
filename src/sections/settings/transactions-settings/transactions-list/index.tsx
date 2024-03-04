import {
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
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
import { IBeneficiary } from "@types/beneficiaries";
import { chevronForwardOutline } from "ionicons/icons";

type Props = {
  data: IBeneficiary[] | [] | any;
};
const TransactionsList = ({ data }: Props) => {
  const history = useHistory();
  const handleViewDetail = (uuid: string) => {
    history.push(`/tabs/transactions/${uuid}`);
  };

  console.log();

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
                    <IonCardContent>
                      {data[key]?.map((el, i) => (
                        <IonItem
                          key={i}
                          button={true}
                          lines="full"
                          onClick={() =>
                            history.push(`/tabs/transactions/${el?.uuid}`)
                          }
                        >
                          <TransactionCard data={el} />
                          <IonIcon
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
