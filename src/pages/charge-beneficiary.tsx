import CustomHeader from "@components/header/customHeader";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";

const ChargeBeneficiaryPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Charge Beneficiaries" showStatus />
      <IonContent fullscreen>
        <ChargeBeneficiary />
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryPage;
