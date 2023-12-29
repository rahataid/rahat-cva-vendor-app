import {
  IonAvatar,
  IonCard,
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
} from "ionicons/icons";
import { useHistory } from "react-router";

function Settings() {
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
    logout();
    history.replace("/landing");
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
      label: "Logout",
      startIcon: logOut,
      action: handleLogout,
    },
  ];

  return (
    <IonCard>
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
      </IonList>
      <IonList>
        <IonItem>
          <IonIcon icon={wifiOutline} slot="start" />
          <IonLabel>Internet Status</IonLabel>
          <IonToggle checked={internetAccess} onIonChange={handleToggle} />
        </IonItem>
        {settingsOptions.map((option, index) => (
          <IonItem key={index} button={true} onClick={option.action}>
            <IonIcon icon={option.startIcon} slot="start" />

            <IonLabel>{option.label}</IonLabel>
            {option?.endIcon && <IonIcon icon={option.endIcon} slot="end" />}
          </IonItem>
        ))}
      </IonList>
    </IonCard>
  );
}
export default Settings;
