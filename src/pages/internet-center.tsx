import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import useAppStore from "@store/app";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const InternetAccessCenter = () => {
  const { internetAccess, setInternetAccess } = useAppStore((state) => ({
    internetAccess: state.internetAccess,
    setInternetAccess: state.setInternetAccess,
  }));
  const history = useHistory();

  const handleToggle = () => {
    setInternetAccess(!internetAccess);
  };

  const handleSync = () => {
    // Handle sync transactions here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon
            slot="start"
            icon={chevronBackOutline}
            onClick={() => history.goBack()}
          />
          <IonTitle>Internet Access Center</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Internet Status</IonLabel>
            <IonToggle checked={internetAccess} onIonChange={handleToggle} />
          </IonItem>
          {internetAccess && (
            <IonItem>
              <IonButton expand="full" onClick={handleSync}>
                Sync Transactions
              </IonButton>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InternetAccessCenter;
