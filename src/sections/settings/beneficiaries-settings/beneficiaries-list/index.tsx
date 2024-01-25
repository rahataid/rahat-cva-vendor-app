import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import BeneficiaryCard from "../beneficiaries-card";
import { IBeneficiary } from "../../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

type Props = {
  data: IBeneficiary[] | [];
};
const BeneficiariesList = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map((el, i) => <BeneficiaryCard key={i} beneficiary={el} />)
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

export default BeneficiariesList;
