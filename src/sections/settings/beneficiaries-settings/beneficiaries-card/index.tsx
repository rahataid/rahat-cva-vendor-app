// YourComponent.jsx
import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

type IBeneficiary = {
  name: string;
  walletAddress: string;
  token: string;
  otp: string;
};

type Props = {
  beneficiary: IBeneficiary;
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
