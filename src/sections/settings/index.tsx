import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonAlert,
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToggle,
} from "@ionic/react";
import useAppStore from "@store/app";
import {
  chevronForwardOutline,
  logOut,
  wifiOutline,
  people,
  cashOutline,
  hammerOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import "../auth/registration/mnemonicDialog.scss";

function Settings() {
  const [showAlert, setShowAlert] = useState(false);
  const { internetAccess, setInternetAccess, currentUser, logout } =
    useAppStore((state) => ({
      setInternetAccess: state.setInternetAccess,
      internetAccess: state.projectSettings?.internetAccess,
      currentUser: state.currentUser,
      logout: state.logout,
    }));

  const history = useHistory();

  const handleToggle = () => {
    setInternetAccess(!internetAccess);
  };

  const handleLogout = () => {
    setShowAlert(true);
  };

  const handleConfirmLogout = () => {
    logout();
    history.replace("/landing");
  };

  const handleCancelLogout = () => {
    setShowAlert(false);
  };

  const settingsOptions = [
    // {
    //   label: "Offline Mode",
    //   startIcon: wifiOutline,
    //   action: () => history.push("/tabs/settings/internet-center"),
    //   checked: internetAccess,
    //   isToggle: false,
    //   endIcon: chevronForwardOutline,
    // },
    {
      label: "Beneficiaries",
      startIcon: people,
      action: () => history.push("/tabs/settings/beneficiaries"),
      isToggle: false,
      endIcon: chevronForwardOutline,
    },
    {
      label: "Transactions",
      startIcon: cashOutline,
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
      startIcon: logOut,
      action: handleLogout,
    },
  ];

  return (
    <>
      <IonAlert
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
          <IonItem button={true} onClick={handleToggle}>
            <IonIcon icon={wifiOutline} slot="start" />
            <IonLabel>Internet Status</IonLabel>
            <IonToggle checked={internetAccess} />
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
