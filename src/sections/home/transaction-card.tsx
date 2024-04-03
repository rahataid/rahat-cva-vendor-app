import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { ITransactionItem } from "../../types/transactions";
import { useHistory } from "react-router";
import { cropString, formatDate } from "@utils/helperFunctions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IBeneficiary, BENEFICIARY_TYPE } from "../../types/beneficiaries";
import { chevronForwardOutline, swapHorizontalOutline } from "ionicons/icons";
import CustomDivider from "@components/divider";
import "./home.scss";
import { useEffect, useState } from "react";
import TransactionSkeleton from "@components/loaders/skeleton/transactions-list";
type Props = {
  transactionsList: ITransactionItem[];
  transactionsLoading?: boolean;
};

const TransactionCard = ({ transactionsList, transactionsLoading }: Props) => {
  const history = useHistory();
  const [filter, setFilter] = useState("ALL");

  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="transactions-container">
        <IonSegment
          swipeGesture={true}
          value={filter}
          mode="md"
          onIonChange={(e: any) => {
            setFilter(e.detail.value);
          }}
        >
          <IonSegmentButton value="ALL">
            <IonLabel className="segment-label">All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="ENROLLED">
            <IonLabel className="segment-label">Enrolled</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="REFERRED">
            <IonLabel className="segment-label">Referred</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {transactionsLoading ? (
          <TransactionSkeleton length={5} />
        ) : (
          <IonList className="ion-list-no-padding" mode="md">
            <>
              {transactionsList?.length ? (
                transactionsList
                  ?.slice(-5)
                  .reverse()
                  .map((el: ITransactionItem, i: number) => (
                    <IonItem
                      mode="md"
                      key={i}
                      button={true}
                      lines="full"
                      onClick={() =>
                        history.push(`/tabs/transactions/details`, {
                          data: { transaction: el },
                        })
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
                                <p>{cropString(el?.beneficiary)}</p>
                                <p>{cropString(el?.transactionHash)}</p>
                                <p>{formatDate(el?.blockTimestamp) || "-"}</p>
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

        <IonButton
          disabled={false}
          expand="block"
          color="primary"
          className="view-all-btn-padding"
          onClick={() => history.push("/tabs/transactions")}
        >
          View All
        </IonButton>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
