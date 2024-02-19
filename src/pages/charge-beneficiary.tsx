import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";
import { useLocation } from "react-router";

type Props = {
  scannerValue: string;
};
interface LocationState {
  data: Props;
}

const ChargeBeneficiaryPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Charge Beneficiary" showStatus />
      <IonContent fullscreen>
        <ChargeBeneficiary data={data} />
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryPage;
