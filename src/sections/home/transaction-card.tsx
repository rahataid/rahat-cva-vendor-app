import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from "@ionic/react";
import { ITransactionItem } from "../../types/transactions";
import { useHistory } from "react-router";
import { cropString } from "@utils/helperFunctions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

type PropTypes = {
  transactionsList: ITransactionItem[] | null;
};

const TransactionCard = ({ transactionsList }: PropTypes) => {
  const history = useHistory();
  return (
    <TransparentCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {transactionsList?.length ? (
            transactionsList
              ?.slice(-3)
              .reverse()
              .map((el, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <IonNote>
                      {el?.status == "SUCCESS" ? (
                        <IonChip style={{ color: "green" }}>
                          {el?.status}
                        </IonChip>
                      ) : (
                        <IonChip style={{ color: "red" }}>{el?.status}</IonChip>
                      )}
                      {el?.isOffline ? (
                        <IonChip style={{ color: "grey" }}>OFFLINE</IonChip>
                      ) : (
                        <IonChip style={{ color: "blue" }}>ONLINE</IonChip>
                      )}
                    </IonNote>
                    <IonNote>
                      <p>
                        <strong>Transaction Hash: </strong>
                        {el?.hash ? cropString(el.hash) : "-"}
                      </p>
                    </IonNote>

                    <IonNote>
                      <p>
                        <strong>Wallet Address: </strong>
                        {el?.walletAddress ? cropString(el.walletAddress) : "-"}
                      </p>
                    </IonNote>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <IonNote>
                        <p>
                          <strong>Phone: </strong>
                          {el.phone || "-"}
                        </p>
                      </IonNote>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <IonNote>
                        <p>
                          <strong>Tokens: </strong>
                          {el?.amount || "-"}
                        </p>
                      </IonNote>
                    </div>
                    <IonNote>
                      <p>
                        <strong>Created At: </strong>
                        {new Date(el?.createdAt).toLocaleString() || "-"}
                      </p>
                    </IonNote>
                  </IonLabel>
                </IonItem>
              ))
          ) : (
            <IonText>No data available...</IonText>
          )}
        </IonList>
        <IonButton
          disabled={false}
          expand="block"
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={() => history.push("/tabs/settings/transactions/list")}
        >
          View All
        </IonButton>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
