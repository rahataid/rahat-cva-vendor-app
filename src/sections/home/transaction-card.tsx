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
} from "@ionic/react";
import { ITransactionItem } from "../../types/transactions";
import { useHistory } from "react-router";
import { cropString } from "@utils/helperFunctions";

type PropTypes = {
  transactionsList: ITransactionItem[] | null;
};

const TransactionCard = ({ transactionsList }: PropTypes) => {
  const history = useHistory();
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Transactions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {transactionsList
            ?.slice(-3)
            .reverse()
            .map((el, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <IonNote>
                    {el?.status == "SUCCESS" ? (
                      <IonChip style={{ color: "green" }}>{el?.status}</IonChip>
                    ) : (
                      <IonChip style={{ color: "red" }}>{el?.status}</IonChip>
                    )}
                    {el?.isOffline ? (
                      <IonChip style={{ color: "grey" }}>OFFLINE</IonChip>
                    ) : (
                      <IonChip style={{ color: "blue" }}>ONLINE</IonChip>
                    )}
                  </IonNote>
                  <h2>Transaction Hash: {el?.hash ? cropString(el.hash) : "-"}</h2>

                  <IonNote>
                    Wallet Address: {el?.walletAddress ? cropString(el.walletAddress) : "-"}
                  </IonNote>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <IonNote>
                      Phone: {el.phone || "-"}
                    </IonNote>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <IonNote>Tokens: {el?.amount || "-"}</IonNote>
                  </div>
                  <IonNote>
                    Created At: {JSON.stringify(new Date(el?.createdAt).toLocaleString()) || "-"}
                  </IonNote>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
        <IonButton
          disabled={false}
          expand="block"
          color="blue"
          style={{ marginTop: "1rem" }}
          onClick={() => history.push("/tabs/settings/transactions/list")}
        >
          View All
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default TransactionCard;
