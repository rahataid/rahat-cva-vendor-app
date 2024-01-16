import CustomHeader from "@components/header/customHeader";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Settings from "@sections/settings";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Settings" showStatus={true} />
      <IonContent fullscreen>
        <Settings />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
