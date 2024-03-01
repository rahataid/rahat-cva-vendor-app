import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import RestoreWallet from "@sections/auth/restore-wallet";
import CustomHeader from "@components/header/customHeader";

const RestoreWalletPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Restore Wallet" showBackButton />
      <IonContent className="bg" fullscreen scrollY={false}>
        <RestoreWallet />
      </IonContent>
    </IonPage>
  );
};

export default RestoreWalletPage;
