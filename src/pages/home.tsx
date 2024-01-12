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
import VendorsService from "@services/vendors";
import useAppStore from "@store/app";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender(!forceRender);
  };

  const wallet = useAppStore((state) => state.wallet);
  const vendorAddress = wallet?.address;
  const { chainData } = useVendorChainData(vendorAddress, forceRender);

  const acceptPendingTokens = async () => {
    const res = await VendorsService.acceptPendingTokens(vendorAddress);
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
          disbursed={chainData?.disbursed}
          pendingTokensToAccept={chainData?.pendingTokens}
          acceptPendingTokens={acceptPendingTokens}
          handleReload={handleReload}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
