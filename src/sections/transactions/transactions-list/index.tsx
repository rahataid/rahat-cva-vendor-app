import {
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import {
  IAllTransactionItem,
  IAllTransactions,
} from "../../../types/transactions";
import TransactionCard from "../transactions-card";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { useHistory } from "react-router";
import { chevronForwardOutline } from "ionicons/icons";
import ListSkeletonCard from "@components/loaders/skeleton/card/list";
import { sortBeneficiariesByDate } from "@utils/helperFunctions";
import { useTranslation } from "react-i18next";

type Props = {
  data: IAllTransactions;
  loading: boolean;
  error: any;
};
const TransactionsList = ({ data, loading }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  if (loading) return <ListSkeletonCard length={9} />;
  let sortedData = null;
  if (data) sortedData = sortBeneficiariesByDate(data);
  return (
    <>
      {data && sortedData && Object.keys(sortedData)?.length ? (
        <>
          <TransparentCard>
            <IonList mode="md">
              {Object.keys(sortedData).map((key, i) => {
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
                      {sortedData[key]?.map(
                        (el: IAllTransactionItem, i: number) => (
                          <IonItem
                            key={i}
                            button={true}
                            lines="full"
                            onClick={() =>
                              history.push(
                                `/tabs/transactions/${el.transactionHash}`
                              )
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
                        )
                      )}
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
            <IonText className="ion-text-center">
              {t("TRANSACTIONS_LIST_PAGE.NO_DATA")}
            </IonText>
          </IonCardHeader>
        </TransparentCard>
      )}
    </>
  );
};

export default TransactionsList;
