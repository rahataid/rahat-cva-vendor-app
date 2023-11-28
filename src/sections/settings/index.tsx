import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonCard,
} from "@ionic/react";
import useAppStore from "@store/app";
import useStorage from "@store/storage";
import { getCurrentUser, logOut as logOutUser } from "@utils/sessionManager";
import { logOut } from "ionicons/icons";
import { useHistory } from "react-router";

function Settings() {
  // const storage = useStorage();
  const { toggleIsAuthenticated } = useAppStore((state) => ({
    toggleIsAuthenticated: state.toggleIsAuthenticated,
  }));
  const currentUser = getCurrentUser();

  const history = useHistory();
  const handleLogout = () => {
    // storage.logout();
    logOutUser();
    toggleIsAuthenticated();
    history.replace("/landing");
  };
  return (
    <IonCard>
      <IonList>
        <IonItem>
          <IonAvatar aria-hidden="true" slot="start">
            <img
              alt=""
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonLabel>{currentUser?.name || "-"}</IonLabel>
        </IonItem>
      </IonList>
      <IonList>
        <IonItem button={true} onClick={handleLogout}>
          <IonIcon aria-hidden="true" icon={logOut} slot="start"></IonIcon>
          <IonLabel>Logout</IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
  );
}
export default Settings;
