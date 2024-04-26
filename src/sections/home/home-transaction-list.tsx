import ListSkeletonCard from "@components/loaders/skeleton/card/list";
import ListSkeleton from "@components/loaders/skeleton/transactions-list";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { DATE_SOURCE } from "@types/beneficiaries";
import { IAllTransactionItem } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";
import { chevronForwardOutline, swapHorizontalOutline } from "ionicons/icons";
import { FC } from "react";
import { useHistory } from "react-router";

type Props = {
  transactionsList: IAllTransactionItem[];
  isLoading: boolean;
};

const HomeTransactionsList: FC<Props> = ({ transactionsList, isLoading }) => {
  const history = useHistory();
  return (
    <>
      {isLoading ? (
        <ListSkeleton length={6} />
      ) : (
        <IonList className="ion-list-no-padding" mode="md">
          <>
            {transactionsList?.length ? (
              transactionsList
                ?.slice(-5)
                .reverse()
                .map((el: IAllTransactionItem, i: number) => (
                  <IonItem
                    mode="md"
                    key={i}
                    button={true}
                    lines="full"
                    onClick={() =>
                      history.push(
                        `/tabs/transactions/${el?.transactionHash}`,
                        {
                          data: { transaction: el },
                        }
                      )
                    }
                  >
                    <>
                      <IonGrid className="px-0">
                        <IonRow>
                          <IonCol size="3" className="home-tx-left-col">
                            <div className="icon-wrapper-round">
                              <IonIcon
                                icon={swapHorizontalOutline}
                                // color={
                                //   el?.beneficiaryType ===
                                //   BENEFICIARY_TYPE.REFERRED
                                //     ? "success"
                                //     : "warning"
                                // }
                              ></IonIcon>
                            </div>
                            {/* {el?.beneficiaryType ===
                              BENEFICIARY_TYPE.REFERRED ? (
                                <IonText
                                  className="transaction-icon-label"
                                  color="success"
                                >
                                  <p>Referred</p>
                                </IonText>
                              ) : (
                                <IonText
                                  className="transaction-icon-label"
                                  color="warning"
                                >
                                  <p>Enrolled</p>
                                </IonText>
                              )} */}
                          </IonCol>
                          <IonCol size="9" className="home-tx-right-col">
                            <IonText>
                              <h2>{el?.eventType}</h2>
                              <p>
                                {el?.beneficiary
                                  ? cropString(el?.beneficiary)
                                  : "-"}
                              </p>
                              <p>
                                {el?.transactionHash
                                  ? cropString(el?.transactionHash)
                                  : "-"}
                              </p>
                              <p>
                                {el?.blockTimestamp
                                  ? formatDate(el?.blockTimestamp)
                                  : "-"}
                              </p>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                      <IonIcon
                        className="end-icon"
                        icon={chevronForwardOutline}
                        slot="end"
                        color="medium"
                      />
                    </>
                  </IonItem>
                ))
            ) : (
              <IonText className="home-tx-no-data-text">
                No data available...
              </IonText>
            )}
          </>
        </IonList>
      )}
    </>
  );
};

export default HomeTransactionsList;
