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
import { useFilteredTransactions } from "@hooks/use-filtered-transactions";
type Props = {
  transactionsList: IBeneficiary[];
};

const TransactionCard = ({ transactionsList }: Props) => {
  const history = useHistory();
  const [filter, setFilter] = useState("ALL");
  const { filteredTransactions, loading } = useFilteredTransactions(
    transactionsList,
    filter
  );
  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonSegment
          value={filter}
          mode="md"
          onIonChange={(e: any) => {
            setFilter(e.detail.value);
          }}
        >
          <IonSegmentButton value="ALL">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="ENROLLED">
            <IonLabel>Enrolled</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="REFERRED">
            <IonLabel>Referred</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {/* <IonGrid>
          <IonRow>
            <IonCol className="filter-btn-container">
              <IonButton size="small" color="primary" fill="outline">
                All
              </IonButton>
            </IonCol>
            <IonCol className="filter-btn-container">
              <IonButton size="small" color="success" fill="outline">
                Referred
              </IonButton>
            </IonCol>
            <IonCol className="filter-btn-container">
              <IonButton size="small" color="warning" fill="outline">
                Enrolled
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        {/* <CustomDivider /> */}
        {loading ? (
          <IonList className="ion-list-no-padding" mode="md">
            {[1, 2, 3, 4, 5].map((index) => (
              <IonItem key={index}>
                <IonThumbnail slot="start">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                  <h3>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "80%" }}
                    ></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "60%" }}
                    ></IonSkeletonText>
                  </p>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "80%" }}
                    ></IonSkeletonText>
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList className="ion-list-no-padding" mode="md">
            <>
              {filteredTransactions?.length ? (
                filteredTransactions
                  ?.slice(-5)
                  .reverse()
                  .map((el, i) => (
                    <IonItem
                      key={i}
                      button={true}
                      lines="full"
                      onClick={() =>
                        history.push(`/tabs/transactions/${el?.uuid}`)
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
                              {el?.beneficiaryType ===
                              BENEFICIARY_TYPE.REFERRED ? (
                                <IonText color="success">
                                  <p>Referred</p>
                                </IonText>
                              ) : (
                                <IonText color="warning">
                                  <p>Enrolled</p>
                                </IonText>
                              )}
                            </IonCol>
                            <IonCol size="9" className="home-tx-right-col">
                              <IonText>
                                <h2>Claim Processed</h2>
                                <p>{el?.name}</p>
                                <p>{formatDate(el.createdAt) || "-"}</p>
                              </IonText>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                        <IonIcon
                          icon={chevronForwardOutline}
                          slot="end"
                          color="medium"
                        />
                      </>
                    </IonItem>
                  ))
              ) : (
                <IonText>No data available...</IonText>
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
