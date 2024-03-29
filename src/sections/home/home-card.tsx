import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonSkeletonText,
} from "@ionic/react";
import { FC } from "react";
import "./home.scss";

interface CardProps {
  title: number;
  subtitle: string;
  image?: string;
  loading?: boolean;
}

const CardComponent: FC<CardProps> = ({ title, subtitle, image, loading }) => {
  return (
    <TransparentCard className="stats-card-container">
      {image && <IonImg src={image} />}
      <IonCardHeader>
        <IonCardSubtitle className="subtitle-container">
          {subtitle}
        </IonCardSubtitle>
        {loading ? (
          <IonCardTitle>
            <IonSkeletonText
              animated={true}
              style={{ width: "35%" }}
            ></IonSkeletonText>
            <IonSkeletonText
              animated={true}
              style={{ width: "50%" }}
            ></IonSkeletonText>
          </IonCardTitle>
        ) : (
          <IonCardTitle>{title || "-"}</IonCardTitle>
        )}
      </IonCardHeader>
      <IonCardContent>{/* Add any additional content here */}</IonCardContent>
    </TransparentCard>
  );
};

export default CardComponent;
