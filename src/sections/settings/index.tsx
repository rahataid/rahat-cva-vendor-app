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
import { getCurrentUser, logOut as logOutUser } from "@utils/sessionManager";
import { chevronForwardOutline, logOut, wifiOutline } from "ionicons/icons";
import { useHistory } from "react-router";

function Settings() {
  const { toggleIsAuthenticated, setInternetAccess, internetAccess } =
    useAppStore((state) => ({
      toggleIsAuthenticated: state.toggleIsAuthenticated,
      setInternetAccess: state.setInternetAccess,
      internetAccess: state.projectSettings?.internetAccess,
    }));
  const currentUser = getCurrentUser();

  const history = useHistory();

  const handleLogout = () => {
    logOutUser();
    toggleIsAuthenticated();
    history.replace("/landing");
  };

  const settingsOptions = [
    {
      label: "Offline Mode",
      startIcon: wifiOutline,
      action: () => history.push("/internet-center"),
      checked: internetAccess,
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
        <IonItem>
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
        {settingsOptions.map((option, index) => (
          <IonItem key={index} button={true} onClick={option.action}>
            {option?.isToggle ? (
              <IonToggle checked={option.checked} />
            ) : (
              <IonIcon icon={option.startIcon} slot="start" />
            )}
            <IonLabel>{option.label}</IonLabel>
            {option?.endIcon && <IonIcon icon={option.endIcon} slot="end" />}
          </IonItem>
        ))}
      </IonList>
    </IonCard>
  );
}
export default Settings;
