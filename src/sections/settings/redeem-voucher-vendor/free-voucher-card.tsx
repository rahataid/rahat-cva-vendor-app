import { IonCardContent } from "@ionic/react";
import TransparentCard from "../../../components/cards/Transparentcard/TransparentCard";

const FreeVoucherCard = () => {
  const handleOnClick = () => {
    console.log("Free Voucher Card Clicked");
  };
  return (
    <TransparentCard onClick={handleOnClick} className="touchable-card">
      <IonCardContent>FREE VOUCHER CARD</IonCardContent>
    </TransparentCard>
  );
};

export default FreeVoucherCard;
