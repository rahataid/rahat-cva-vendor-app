import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import BeneficiariesSettings from "@sections/settings/beneficiaries-settings";
import useAppStore from "@store/app";
import BeneficiariesService from "@services/beneficiaries";

const BeneficiariesSettingsPage: React.FC = () => {
  const { projectSettings, setBeneficiariesList } = useAppStore();
  const handleSync = () => {
    console.log("HANDLE SYNC CALLED");
    const data = BeneficiariesService.listMockBeneficiaries();
    console.log("BENEFICIARIES FROM SERVICE", data);
    setBeneficiariesList(data);
  };
  const props = {
    projectSettings,
    handleSync,
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              color="white"
              icon={caretBack}
              defaultHref="/tabs/settings"
            ></IonBackButton>
          </IonButtons>
          <IonTitle className="title-center">Sync Beneficiaries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BeneficiariesSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesSettingsPage;
