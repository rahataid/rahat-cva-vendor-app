import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../types/transactions";
import { useHistory } from "react-router";
import { cropString } from "@utils/helperFunctions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { BENEFICIARY_TYPE } from "../../types/beneficiaries";
import { swapHorizontalOutline } from "ionicons/icons";
import "./home.scss";
import CustomDivider from "@components/divider";

type PropTypes = {
  transactionsList: ITransactionItem[] | null;
};

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
];

const TransactionCard = () => {
  const history = useHistory();
  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <>
            {transactionsList?.length ? (
              transactionsList
                ?.slice(-5)
                .reverse()
                .map((el, i) => (
                  <IonItem
                    key={i}
                    className="ion-list-no-padding"
                    button={true}
                    onClick={() =>
                      history.push(
                        `/tabs/settings/transactions/${el?.createdAt}`
                      )
                    }
                  >
                    <>
                      <IonGrid>
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
