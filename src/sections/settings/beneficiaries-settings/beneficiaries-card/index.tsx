import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { IBeneficiary } from "../../../../types/beneficiaries";

type Props = {
  beneficiary: IBeneficiary;
};
const BeneficiaryCard = ({ beneficiary }: Props) => {
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
      </IonCardContent>
    </IonCard>
  );
};

export default BeneficiaryCard;
