import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import BeneficiaryCard from "../beneficiaries-card";
import { IBeneficiary } from "../../../../types/beneficiaries";

type Props = {
  data: [IBeneficiary];
};
const BeneficiariesList = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map((el, i) => <BeneficiaryCard key={i} beneficiary={el} />)
      ) : (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              No data available...
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      )}
    </>
  );
};

export default BeneficiariesList;
