import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import Scanner from "@sections/plugins/scanner";
import CustomHeader from "@components/header/customHeader";

const ScannerPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Scanner" showBackButton />
      <IonContent fullscreen scrollY={false}>
        <Scanner />
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
