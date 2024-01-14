import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import NotFound from "@sections/auth/not-found";

const RestoreWalletPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <NotFound />
      </IonContent>
    </IonPage>
  );
};

export default RestoreWalletPage;
