import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { IBeneficiary } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import ReferredBeneficiaryCard from "../referred-beneficiary-card";
import { useState } from "react";

type Props = {
  data: IBeneficiary[] | [];
};
const ReferredBeneficiariesList = ({ data }: Props) => {
  const [beneficiaries, setBeneficiaries] = useState(data || []);
  const handleDelete = (uuid: string) => {
    setBeneficiaries(beneficiaries.filter((el) => el.uuid !== uuid));
  };
  return (
    <>
      {beneficiaries?.length ? (
        beneficiaries.map((el, i) => (
          <ReferredBeneficiaryCard
            key={i}
            beneficiary={el}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <TransparentCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              No data available...
            </IonCardTitle>
          </IonCardHeader>
        </TransparentCard>
      )}
    </>
  );
};

export default ReferredBeneficiariesList;
