import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../types/transactions";
import { useHistory } from "react-router";
import { cropString } from "@utils/helperFunctions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { BENEFICIARY_TYPE } from "../../types/beneficiaries";
import { swapHorizontalOutline } from "ionicons/icons";
import CustomDivider from "@components/divider";
import "./home.scss";

const transactionsList: ITransactionItem[] = [
  {
    projectName: "CVA Project",
    createdAt: 1207678311,
    type: BENEFICIARY_TYPE.REFERRED,
  },
  {
    projectName: "CVA Project",
    createdAt: 1708678411,
    type: BENEFICIARY_TYPE.ENROLLED,
  },
  {
    projectName: "CVA Project",
    createdAt: 1507678311,
    type: BENEFICIARY_TYPE.REFERRED,
  },
  {
    projectName: "CVA Project",
    createdAt: 1308678411,
    type: BENEFICIARY_TYPE.REFERRED,
  },
  {
    projectName: "CVA Project",
    createdAt: 1668678411,
    type: BENEFICIARY_TYPE.ENROLLED,
  },
];

const TransactionCard = () => {
  const history = useHistory();
  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
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
        </IonGrid>
        <CustomDivider />
        <IonList className="ion-list-no-padding" mode="md">
          <>
            {transactionsList?.length ? (
              transactionsList
                ?.slice(-5)
                .reverse()
                .map((el, i) => (
                  <IonItem
                    key={i}
                    button={true}
                    lines="full"
                    onClick={() =>
                      history.push(
                        `/tabs/settings/transactions/${el?.createdAt}`
                      )
                    }
                  >
                    <>
                      <IonGrid className="px-0">
                        <IonRow>
                          <IonCol size="2" className="home-tx-left-col">
                            <div className="icon-wrapper-round">
                              <IonIcon icon={swapHorizontalOutline}></IonIcon>
                            </div>
                          </IonCol>
                          <IonCol size="10" className="home-tx-right-col">
                            <IonText>
                              <h2>Claim Processed</h2>
                              <p>
                                {el?.projectName}{" "}
                                {new Date(el?.createdAt).toLocaleString() ||
                                  "-"}
                              </p>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </>
                  </IonItem>
                ))
            ) : (
              <IonText>No data available...</IonText>
            )}
          </>
        </IonList>
        <IonButton
          disabled={false}
          expand="block"
          color="primary"
          className="view-all-btn-padding"
          onClick={() => history.push("/tabs/settings/transactions/list")}
        >
          View All
        </IonButton>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
