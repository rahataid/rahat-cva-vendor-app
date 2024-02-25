import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonAlert,
  IonAvatar,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonToggle,
  ToggleCustomEvent,
} from "@ionic/react";
import useAppStore from "@store/app";
import {
  chevronForwardOutline,
  logOut,
  wifiOutline,
  people,
  cashOutline,
  hammerOutline,
  moonOutline,
  logOutOutline,
  peopleOutline,
  listOutline,
  personAddOutline,
  personAddSharp,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../auth/registration/mnemonicDialog.scss";
import useTransactionStore from "@store/transaction";
import useBeneficiaryStore from "@store/beneficiary";

import "../../theme/main.scss";

function Settings() {
  const [showAlert, setShowAlert] = useState(false);
  const { internetAccess, setInternetAccess, currentUser, logout } =
    useAppStore((state) => ({
      setInternetAccess: state.setInternetAccess,
      internetAccess: state.projectSettings?.internetAccess,
      currentUser: state.currentUser,
      logout: state.logout,
    }));
  const { logoutTransactions } = useTransactionStore();
  const { logoutBeneficiaries } = useBeneficiaryStore();

  const history = useHistory();

  const handleToggle = () => {
    setInternetAccess(!internetAccess);
  };

  const [themeToggle, setThemeToggle] = useState(false);

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
  };

  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  // useEffect(() => {
  //   // Use matchMedia to check the user preference
  //   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  //   // Initialize the dark theme based on the initial
  //   // value of the prefers-color-scheme media query
  //   initializeDarkTheme(false);

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersDark.addEventListener("change", (mediaQuery) =>
  //     initializeDarkTheme(mediaQuery.matches)
  //   );
  // }, []);

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
    {
      label: "Beneficiaries",
      startIcon: peopleOutline,
      action: () => history.push("/tabs/settings/beneficiaries"),
      isToggle: false,
      endIcon: chevronForwardOutline,
    },
    {
      label: "Referred Beneficiaries",
      startIcon: personAddOutline,
      action: () => history.push("/tabs/settings/referred-beneficiaries/list"),
      isToggle: false,
      endIcon: chevronForwardOutline,
    },
    {
      label: "Transactions",
      startIcon: listOutline,
      action: () => history.push("/tabs/settings/transactions"),
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
          <IonItem button={true} onClick={() => history.push("/tabs/profile")}>
            <IonAvatar slot="start">
              <img
                alt="User avatar"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonLabel>{currentUser?.name || "-"}</IonLabel>
          </IonItem>

          {settingsOptions.map((option, index) => (
            <IonItem key={index} button={true} onClick={option.action}>
              <IonIcon icon={option.startIcon} slot="start" />

              <IonLabel>{option.label}</IonLabel>
              {option?.endIcon && <IonIcon icon={option.endIcon} slot="end" />}
            </IonItem>
          ))}
        </IonList>
      </TransparentCard>
    </>
  );
}
export default Settings;
