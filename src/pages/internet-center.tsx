import {
  IonBackButton,
  IonButton,
  IonButtons,
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
import InternetAccessCenter from "@sections/internet-access-center";
import useAppStore from "@store/app";
import { caretBack, chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const InternetAccessCenterPage = () => {
  const { transactions } = useAppStore((state) => ({
    transactions: state.transactions,
  }));
  const { projectSettings, setInternetAccess } = useAppStore((state) => ({
    projectSettings: state.projectSettings,
    setInternetAccess: state.setInternetAccess,
  }));
  const history = useHistory();

  const handleToggle = () => {
    setInternetAccess(!projectSettings?.internetAccess);
  };

  const handleSync = async () => {
    console.log("HANDLE SYNC TRANSACTIONS");
    let offlineTransactions = transactions;
    console.log("offline transactions", offlineTransactions);
    offlineTransactions?.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    console.log("sorted transactions", offlineTransactions);

    // Handle sync transactions here
  };

  const props = {
    handleToggle,
    handleSync,
    projectSettings,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="white" icon={caretBack}></IonBackButton>
          </IonButtons>
          {/* <IonIcon
            slot="start"
            icon={chevronBackOutline}
            onClick={() => history.goBack()}
          /> */}
          <IonTitle className="title-center">Internet Access Center</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Internet Access Center</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InternetAccessCenter {...props} />
      </IonContent>
    </IonPage>
  );
};

export default InternetAccessCenterPage;
