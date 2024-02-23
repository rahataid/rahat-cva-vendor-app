import React, { useState } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import { caretBack } from "ionicons/icons";
import BeneficiariesSettings from "@sections/settings/beneficiaries-settings";
import useAppStore from "@store/app";
import CustomHeader from "@components/header/customHeader";
import useBeneficiaryStore from "@store/beneficiary";

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
      <CustomHeader title="Beneficiaries" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <BeneficiariesSettings {...props} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesSettingsPage;
