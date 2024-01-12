import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { ITransactionItem } from "../../../../types/transactions";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

type Props = {
  transaction: ITransactionItem;
};
const TransactionCard = ({ transaction }: Props) => {
  const { createdAt, amount, status, isOffline, hash, walletAddress, phone } =
    transaction;

  return (
    <TransparentCard>
      {/* <IonCardHeader>
        <IonCardTitle>Transaction Hash: {hash || "N/A"}</IonCardTitle>
      </IonCardHeader> */}
      <IonCardContent>
        <p>
          <strong>Transaction Hash:</strong> {hash || "N/A"}
        </p>
        <p>
          <strong>amount:</strong> {amount || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {status || "N/A"}
        </p>
        <p>
          <strong>Offline: </strong>
          {isOffline ? "Yes" : "No"}
        </p>
        <p>
          <strong>Wallet Address:</strong> {walletAddress || "N/A"}
        </p>
        <p>
          <strong>Phone: </strong>
          {phone || "N/A"}
        </p>
        <p>
          <strong>Created At: </strong>
          {new Date(createdAt).toLocaleString() || "-" || "N/A"}
        </p>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
