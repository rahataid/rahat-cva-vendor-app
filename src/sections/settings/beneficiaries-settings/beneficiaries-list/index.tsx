import { IonCard, IonItem, IonList, IonText } from "@ionic/react";
import BeneficiaryCard from "../beneficiaries-card";

type Props = {
  data: any[];
};
const BeneficiariesList = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map((el) => <BeneficiaryCard beneficiary={el} />)
      ) : (
        <>No data found</>
      )}
    </>
  );
};

export default BeneficiariesList;
