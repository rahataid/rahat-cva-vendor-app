import React, { useState } from "react";
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleSync = async () => {
    console.log("HANDLE SYNC CALLED");
    setShowLoading(true);
    try {
      const data = await BeneficiariesService.listMockBeneficiaries();
      console.log("BENEFICIARIES FROM SERVICE", data);
      setBeneficiariesList(data);
      setShowLoading(false);
      setToastMessage("Beneficiaries synced");
      setShowToast(true);
    } catch (error: any) {
      setShowLoading(false);
      error?.message
        ? setToastMessage(error?.message)
        : setToastMessage("Something went wrong!");
      setShowToast(true);
    }
  };

  const handleButtonFocus = () => {
    console.log("HAANDLE BUTTON FOCUS");
    if (!projectSettings?.internetAccess) {
      setToastMessage("Must be online to sync");
      setShowToast(true);
    }
  };

  const props = {
    projectSettings,
    handleSync,
    showToast,
    setShowToast,
    handleButtonFocus,
    toastMessage,
    setToastMessage,
    showLoading,
    setShowLoading,
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
          <IonTitle color="white">Beneficiaries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BeneficiariesSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesSettingsPage;
