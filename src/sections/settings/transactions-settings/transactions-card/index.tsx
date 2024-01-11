import { IonCard, IonCardContent } from "@ionic/react";
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
      <IonCardContent>
        <h2>
          <b>Transaction Hash: {hash || "N/A"}</b>
        </h2>
        <p>amount: {amount || "N/A"}</p>
        <p>Status: {status || "N/A"}</p>
        <p>Offline: {isOffline ? "Yes" : "No"}</p>
        <p>Wallet Address: {walletAddress || "N/A"}</p>
        <p>Phone: {phone || "N/A"}</p>
        <p>Created At: {createdAt?.toString() || "N/A"}</p>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionCard;
