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
import useAppStore from "@store/app";
import TransactionsSettings from "@sections/settings/transactions-settings";

const TransactionsSettingsPage: React.FC = () => {
  const { projectSettings, syncTransactions } = useAppStore();
  const [showToast, setShowToast] = useState(false);

  const handleSync = () => {
    console.log("HANDLE SYNC CALLED");
    syncTransactions();
  };

  const handleButtonFocus = () => {
    console.log("HAANDLE BUTTON FOCUS");
    if (!projectSettings?.internetAccess) setShowToast(true);
  };

  const props = {
    projectSettings,
    handleSync,
    showToast,
    setShowToast,
    handleButtonFocus,
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
          <IonTitle className="title-center">Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TransactionsSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsSettingsPage;
