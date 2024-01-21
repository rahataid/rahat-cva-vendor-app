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
import CustomHeader from "@components/header/customHeader";
import useBeneficiaryStore from "@store/beneficiaries";

const BeneficiariesSettingsPage: React.FC = () => {
  const { projectSettings } = useAppStore();
  const { syncBeneficiaries } = useBeneficiaryStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleSync = async () => {
    try {
      setShowLoading(true);
      await syncBeneficiaries();
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
      <CustomHeader title="Beneficiaries" showStatus showBackButton />
      <IonContent>
        <BeneficiariesSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesSettingsPage;
