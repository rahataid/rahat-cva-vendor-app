import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonAlert,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  ToggleCustomEvent,
} from "@ionic/react";
import useAppStore from "@store/app";
import {
  chevronForwardOutline,
  hammerOutline,
  logOutOutline,
  personOutline,
  idCardOutline,
  giftOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import "../auth/registration/mnemonicDialog.scss";
import useTransactionStore from "@store/transaction";
import useBeneficiaryStore from "@store/beneficiary";

import "../../theme/main.scss";

function Settings() {
  const [showAlert, setShowAlert] = useState(false);
  const { currentUser, logout } = useAppStore();
  const { logoutTransactions } = useTransactionStore();
  const { logoutBeneficiaries } = useBeneficiaryStore();

  const history = useHistory();

  const [themeToggle, setThemeToggle] = useState(false);

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
  };

  const handleLogout = () => {
    setShowAlert(true);
  };

  const handleConfirmLogout = () => {
    logout();
    logoutTransactions();
    logoutBeneficiaries();
    history.replace("/landing");
  };

  const handleCancelLogout = () => {
    setShowAlert(false);
  };

  const settingsOptions = [
    // {
    //   label: "Referred Beneficiaries",
    //   startIcon: personAddOutline,
    //   action: () => history.push("/tabs/settings/referred-beneficiaries/list"),
    //   isToggle: false,
    //   endIcon: chevronForwardOutline,
    // },
    // {
    //   label: "Transactions",
    //   startIcon: listOutline,
    //   action: () => history.push("/tabs/settings/transactions/list"),
    //   isToggle: false,
    //   endIcon: chevronForwardOutline,
    // },
    {
      label: "Profile",
      startIcon: personOutline,
      action: () => history.push("/tabs/settings/profile"),
      isToggle: false,
      endIcon: chevronForwardOutline,
    },
    {
      label: "Projects",
      startIcon: hammerOutline,
      action: () => history.push("/tabs/settings/project"),
      isToggle: false,
      endIcon: chevronForwardOutline,
    },

    {
      label: "Logout",
      startIcon: logOutOutline,
      action: handleLogout,
    },
  ];

  if (currentUser?.projects?.length > 0) {
    settingsOptions.splice(
      1,
      0,
      {
        label: "Redeem Voucher",
        startIcon: giftOutline,
        action: () => history.push("/tabs/settings/redeem-voucher-vendor"),
        isToggle: false,
        endIcon: chevronForwardOutline,
      },
      {
        label: "Voucher Redemption Details",
        startIcon: idCardOutline,
        action: () => history.push("/tabs/settings/voucher-redemption-details"),
        isToggle: false,
        endIcon: chevronForwardOutline,
      }
    );
  }

  return (
    <>
      <IonAlert
        mode="md"
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Confirm Logout"}
        message={"Are you sure you want to logout?"}
        buttons={[
          {
            text: "Cancel",
            cssClass: "alert-button-cancel",
            handler: handleCancelLogout,
          },
          {
            text: "Confirm",
            cssClass: "alert-button-confirm",
            handler: handleConfirmLogout,
          },
        ]}
      />
      <TransparentCard>
        <IonList>
          {/* <IonItem button={true} onClick={() => history.push("/tabs/profile")}>
            <IonAvatar slot="start">
              <img
                alt="User avatar"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonLabel>{currentUser?.name || "-"}</IonLabel>
          </IonItem> */}

          {/* <IonItem button={true} onClick={toggleChange}>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={themeToggle} />
          </IonItem> */}

          {settingsOptions.map((option, index) => (
            <IonItem key={index} button={true} onClick={option.action}>
              <IonIcon icon={option.startIcon} slot="start" color="primary" />

              <IonLabel>{option.label}</IonLabel>
              {option?.endIcon && (
                <IonIcon icon={option.endIcon} slot="end" color="medium" />
              )}
            </IonItem>
          ))}
        </IonList>
      </TransparentCard>
    </>
  );
}
export default Settings;
