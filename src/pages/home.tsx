import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/title.css";
import Home from "../sections/home";
import { getCurrentUser } from "@utils/sessionManager";

const HomePage: React.FC = () => {
  const currentUser = getCurrentUser();
  const vendorAddress = currentUser?.walletAddress;
  console.log(vendorAddress, "current user wallet address");

  const acceptPendingTokens = async () => {
    console.log("ACCEPT PENDING TOKENS");
  };

  const homeProps = {
    projectBalance: "900",
    allowance: "10",
    isVendorApproved: "false",
    isProjectLocked: "true",
    pendingTokensToAccept: "1",
    disbursed: "3",
    acceptPendingTokens: () => {},
    isVendor: "false",
  };

  console.log("VENDOR DATA", homeProps);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Home {...homeProps} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
