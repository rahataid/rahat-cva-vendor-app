import { useVendorChainData } from "@api/vendors";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Home from "../sections/home";
import "../theme/title.css";
import VendorsService from "@services/vendors";
import useAppStore from "@store/app";
import { useState } from "react";
import CustomHeader from "@components/header/customHeader";
import IndeterminateLoader from "@components/loaders/Indeterminate";

const HomePage: React.FC = () => {
  const { wallet, projectSettings, mockData } = useAppStore();
  // const { vendorTransactions } = useTransactionStore();
  const vendorTransactions = mockData;

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender((prev) => !prev);
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
        {isLoading && !chainData?.isVendorApproved && <IndeterminateLoader />}
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
