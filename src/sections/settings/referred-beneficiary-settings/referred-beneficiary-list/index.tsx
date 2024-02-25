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

type Props = {
  data: IBeneficiary[] | [];
};
const ReferredBeneficiariesList = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map((el, i) => (
          <ReferredBeneficiaryCard key={i} beneficiary={el} />
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
