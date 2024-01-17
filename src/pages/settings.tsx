import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import Settings from "@sections/settings";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Settings" showStatus />
      <IonContent fullscreen>
        <Settings />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
