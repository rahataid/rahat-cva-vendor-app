import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/title.css";
import RestoreWallet from "@sections/auth/restore-wallet";
import { caretBack } from "ionicons/icons";

const RestoreWalletPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="white" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle color="white">Restore Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Restore Wallet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RestoreWallet />
      </IonContent>
    </IonPage>
  );
};

export default RestoreWalletPage;
