import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent } from "@ionic/react";
import { FC } from "react";
import TransactionSkeleton from "../transactions-list";

type Props = {
  length?: number;
};

const ListSkeletonCard: FC<Props> = ({ length }) => (
  <TransparentCard>
    <IonCardContent>
      <TransactionSkeleton length={length} />
    </IonCardContent>
  </TransparentCard>
);

export default ListSkeletonCard;
