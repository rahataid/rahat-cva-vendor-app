import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { IBeneficiary } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

type Props = {
  beneficiary: IBeneficiary;
};
const BeneficiaryCard = ({ beneficiary }: Props) => {
  return (
    <TransparentCard>
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
      </IonCardContent>
    </TransparentCard>
  );
};

export default BeneficiaryCard;
