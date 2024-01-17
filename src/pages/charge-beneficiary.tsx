import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";

const ChargeBeneficiaryPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Charge Beneficiary" showStatus />
      <IonContent fullscreen>
        <ChargeBeneficiary />
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryPage;
