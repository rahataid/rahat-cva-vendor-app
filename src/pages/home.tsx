import { useVendorChainData } from "@api/vendors";
import { IonContent, IonPage } from "@ionic/react";
import Home from "../sections/home";
import "../theme/title.css";
import VendorsService from "@services/vendors";
import useAppStore from "@store/app";
import { useState } from "react";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";

const HomePage: React.FC = () => {
  const { wallet, projectSettings } = useAppStore();
  const { vendorTransactions } = useTransactionStore();

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender(!forceRender);
  };

  const { chainData, isLoading } = useVendorChainData(
    wallet?.address,
    forceRender
  );

  const acceptPendingTokens = async () => {
    await VendorsService.acceptPendingTokens(vendorAddress);
  };

  return (
    <IonPage>
      <CustomHeader title="Home" showStatus />
      <IonContent fullscreen>
        <Home
          allowance={chainData?.allowance}
          isVendor={chainData?.isVendorApproved}
          isProjectLocked={chainData?.isProjectLocked}
          disbursed={chainData?.disbursed}
          pendingTokensToAccept={chainData?.pendingTokens}
          acceptPendingTokens={acceptPendingTokens}
          projectSettings={projectSettings}
          vendorTransactions={vendorTransactions}
          handleReload={handleReload}
          loading={isLoading}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
