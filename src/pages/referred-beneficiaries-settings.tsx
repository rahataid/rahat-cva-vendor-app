import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import BeneficiariesSettings from "@sections/settings/beneficiaries-settings";
import useAppStore from "@store/app";
import CustomHeader from "@components/header/customHeader";
import useBeneficiaryStore from "@store/beneficiary";
import BeneficiariesList from "@sections/settings/beneficiaries-settings/beneficiaries-list";

const BeneficiaryData: any = [
  {
    name: "Mani Byanjankari",
    phone: "9841234567",
    address: "Kathmandu",
    referredBy: "Suman Byanjankari",
    referredOn: "2021-09-01",
  },
];

const ReferredBeneficiariesSettingsPage: React.FC = () => {
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
              <BeneficiariesList {...props} data={[]} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesSettingsPage;
