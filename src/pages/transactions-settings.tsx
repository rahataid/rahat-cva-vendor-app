import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import useAppStore from "@store/app";
import TransactionsSettings from "@sections/settings/transactions-settings";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";

const TransactionsSettingsPage: React.FC = () => {
  const { projectSettings } = useAppStore();
  const { syncTransactions } = useTransactionStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleSync = async () => {
    try {
      setShowLoading(true);
      await syncTransactions();
      setShowLoading(false);
      setToastMessage("Pending offline transactions synced successfully");
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
      setToastMessage("Must go online to sync transactions");
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
    showLoading,
    setShowLoading,
  };

  return (
    <IonPage>
      <CustomHeader title="Transactions" showStatus showBackButton />
      <IonContent>
        <TransactionsSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default TransactionsSettingsPage;
