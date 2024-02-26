import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { IBeneficiary, VOUCHER } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import CustomChip from "@components/chip/customChip";

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
        <p>{beneficiary?.phone}</p>
        {/* <p>
          <strong>Phone:</strong> {beneficiary?.phone}
        </p> */}
        <p>
          {beneficiary?.voucherType === "FREE_VOUCHER" ? (
            <IonText color="warning">Free Voucher</IonText>
          ) : (
            <IonText color="success">Discount Voucher</IonText>
          )}
        </p>
      </IonCardContent>
    </TransparentCard>
  );
};

export default BeneficiaryCard;
