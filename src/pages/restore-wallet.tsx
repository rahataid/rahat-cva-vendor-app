import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import RestoreWallet from "@sections/auth/restore-wallet";

const RestoreWalletPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restore Wallet</IonTitle>
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
