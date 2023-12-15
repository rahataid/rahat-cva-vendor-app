import { useVendorChainData } from "@api/vendors";
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
  const { chainData } = useVendorChainData(vendorAddress);
  // const transactions = useAppStore((state) => state.transactions);
  // console.log("transactions", transactions);

  const acceptPendingTokens = async () => {
    console.log("ACCEPT PENDING TOKENS");
  };

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
        <Home
          allowance={chainData?.allowance}
          isVendor={chainData?.isVendorApproved}
          isProjectLocked={chainData?.isProjectLocked}
          disbursed={chainData?.distributed}
          pendingTokensToAccept={chainData?.pending}
          acceptPendingTokens={acceptPendingTokens}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
