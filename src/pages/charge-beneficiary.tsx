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
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Charge Token</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Charge Token</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ChargeBeneficiary />
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryPage;
