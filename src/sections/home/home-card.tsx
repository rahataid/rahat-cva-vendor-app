import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import React from "react";

interface CardProps {
  title: string;
  subtitle: string;
  image?: string;
}

const CardComponent: React.FC<CardProps> = ({ title, subtitle, image }) => {
  return (
    <IonCard>
      {image && <IonImg src={image} />}
      <IonCardHeader>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{/* Add any additional content here */}</IonCardContent>
    </IonCard>
  );
};

export default CardComponent;
