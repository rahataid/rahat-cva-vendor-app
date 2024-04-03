import { IonCardContent, IonCardHeader } from "@ionic/react";
import { BENEFICIARY_DETAILS } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import ReferredBeneficiaryCard from "../referred-beneficiary-card";
import TransactionSkeleton from "@components/loaders/skeleton/transactions-list";

type Props = {
  beneficiaries: BENEFICIARY_DETAILS[] | [];
  loading: boolean;
  error: any;
};

const ReferredBeneficiariesList = ({ beneficiaries, loading }: Props) => {
  if (loading)
    return (
      <TransparentCard>
        <IonCardContent>
          <TransactionSkeleton length={9} />
        </IonCardContent>
      </TransparentCard>
    );
  return (
    <>
      {beneficiaries?.length ? (
        beneficiaries.map((el: BENEFICIARY_DETAILS, i: number) => (
          <ReferredBeneficiaryCard key={i} beneficiary={el} />
        ))
      ) : (
        <TransparentCard>
          <IonCardHeader className="ion-text-center">
            No data available...
          </IonCardHeader>
        </TransparentCard>
      )}
    </>
  );
};

export default ReferredBeneficiariesList;
