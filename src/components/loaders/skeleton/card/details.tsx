import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent } from "@ionic/react";
import { FC } from "react";
import DetailsSkeleton from "../details";

type Props = {
  length: number;
};

const DetailsSkeletonCard: FC<Props> = ({ length }) => (
  <TransparentCard>
    <IonCardContent>
      <DetailsSkeleton length={length} />
    </IonCardContent>
  </TransparentCard>
);

export default DetailsSkeletonCard;
