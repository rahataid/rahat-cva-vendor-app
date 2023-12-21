import { IonCard, IonItem, IonList, IonText } from "@ionic/react";
import BeneficiaryCard from "../beneficiaries-card";

type IBeneficiary = {
  name: string;
  walletAddress: string;
  token: string;
  otp: string;
};

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
          <IonText>No data available</IonText>
        </IonCard>
      )}
    </>
  );
};

export default BeneficiariesList;
