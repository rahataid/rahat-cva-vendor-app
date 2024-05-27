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
import { EVENT_TYPE, IAllTransactionItem } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";
import {
  chevronForwardOutline,
  personAddOutline,
  swapHorizontalOutline,
} from "ionicons/icons";
import { FC } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

type Props = {
  transactionsList: IAllTransactionItem[];
  isLoading: boolean;
};

const HomeTransactionsList: FC<Props> = ({ transactionsList, isLoading }) => {
  const { t } = useTranslation();
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
                                color="primary"
                                icon={
                                  el?.eventType === EVENT_TYPE.CLAIM_PROCESSED
                                    ? swapHorizontalOutline
                                    : personAddOutline
                                }
                              ></IonIcon>
                            </div>
                          </IonCol>
                          <IonCol size="9" className="home-tx-right-col">
                            <IonText>
                              <h2>
                                {el?.eventType === EVENT_TYPE.CLAIM_PROCESSED
                                  ? t("GLOBAL.TEXTS.EVENT_TYPE.CLAIM_PROCESSED")
                                  : t(
                                      "GLOBAL.TEXTS.EVENT_TYPE.BENEFICIARY_REFERRED"
                                    )}
                              </h2>
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
                {t("HOME_PAGE.NO_DATA")}
              </IonText>
            )}
          </>
        </IonList>
      )}
    </>
  );
};

export default HomeTransactionsList;
