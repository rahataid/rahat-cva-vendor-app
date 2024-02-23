import { useVendorChainData } from "@api/vendors";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
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
      <CustomHeader title="Home" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
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
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
