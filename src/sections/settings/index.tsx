import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonCard,
} from "@ionic/react";
import useStorage from "@store/storage";
import { logOut } from "ionicons/icons";
import { useHistory } from "react-router";

function Settings() {
  const storage = useStorage();
  const history = useHistory();
  const handleLogout = () => {
    storage.logout();
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
          <IonLabel>Vendor Name</IonLabel>
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
