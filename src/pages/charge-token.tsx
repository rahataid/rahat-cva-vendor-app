import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ChargeToken from "@sections/charge-token";

const ChargeTokenPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Charge Token</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Charge Token</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ChargeToken />
      </IonContent>
    </IonPage>
  );
};

export default ChargeTokenPage;
