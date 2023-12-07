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
  getCurrentUser,
  logOut as logOutUser,
  saveInternetAccess,
} from "@utils/sessionManager";
import { logOut, wifiOutline } from "ionicons/icons";
import { useHistory } from "react-router";

function Settings() {
  const { setInternetAccess: setInternetAccessStorage } = useAppStore(
    (state) => ({
      setInternetAccess: state.setInternetAccess,
    })
  );
  const { toggleIsAuthenticated, setInternetAccess } = useAppStore((state) => ({
    toggleIsAuthenticated: state.toggleIsAuthenticated,
    setInternetAccess: state.setInternetAccess,
  }));
  const currentUser = getCurrentUser();

  const history = useHistory();
  const handleLogout = () => {
    // storage.logout();
    logOutUser();
    toggleIsAuthenticated();
    history.replace("/landing");
  };

  const handleToggleInternetAccess = (e: any) => {
    console.log("TOGGLE INTERNET ACCESS", e.target.checked);
    setInternetAccess(e.target.checked);
    setInternetAccessStorage(e.target.checked);
    saveInternetAccess(e.target.checked);
  };
  return (
    <IonCard>
      <IonList>
        <IonItem>
          <IonAvatar aria-hidden='true' slot='start'>
            <img
              alt=''
              src='https://ionicframework.com/docs/img/demos/avatar.svg'
            />
          </IonAvatar>
          <IonLabel>{currentUser?.name || "-"}</IonLabel>
        </IonItem>
      </IonList>
      <IonList>
        <IonItem button={true} onClick={handleToggleInternetAccess}>
          <IonToggle>Internet Access</IonToggle>
          <IonIcon aria-hidden='true' icon={wifiOutline} slot='start'></IonIcon>
          <IonLabel>Logout</IonLabel>
        </IonItem>
        <IonItem button={true} onClick={handleLogout}>
          <IonIcon aria-hidden='true' icon={logOut} slot='start'></IonIcon>
          <IonLabel>Logout</IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
  );
}
export default Settings;
