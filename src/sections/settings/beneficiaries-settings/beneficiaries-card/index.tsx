// YourComponent.jsx
import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

type Props = {
  beneficiary: any[];
};
const BeneficiaryCard = ({ beneficiary }: Props) => {
  console.log(beneficiary);
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{beneficiary?.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>
          <strong>Wallet Address:</strong> {beneficiary?.walletAddress}
        </p>
        <p>
          <strong>Token:</strong> {beneficiary?.token}
        </p>
        <p>
          <strong>OTP:</strong> {beneficiary?.otp}
        </p>
      </IonCardContent>
    </IonCard>
  );
};

export default BeneficiaryCard;
