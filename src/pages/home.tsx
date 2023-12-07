import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getCurrentUser } from "@utils/sessionManager";
import Home from "../sections/home";
import "../theme/title.css";

const HomePage: React.FC = () => {
  const currentUser = getCurrentUser();
  const vendorAddress = currentUser?.walletAddress;
  console.log(vendorAddress, "current user wallet address");

  const acceptPendingTokens = async () => {
    console.log("ACCEPT PENDING TOKENS");
  };

  const homeProps = {
    projectBalance: null,
    allowance: null,
    isVendorApproved: null,
    isProjectLocked: null,
    pendingTokensToAccept: null,
    disbursed: null,
    isVendor: null,
  };

  console.log("VENDOR DATA", homeProps);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='title-center'>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Home {...homeProps} acceptPendingTokens={acceptPendingTokens} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
