import { useVendorTransaction, useVendorVoucher } from "@api/vendors";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Home from "../sections/home";
import "../theme/title.css";
import useAppStore from "@store/app";
import { useEffect, useState } from "react";
import CustomHeader from "@components/header/customHeader";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import { useGraphService } from "@contexts/graph-query";

const HomePage: React.FC = () => {
  const { wallet, projectSettings, mockData } = useAppStore();
  const { queryService } = useGraphService();

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender((prev) => !prev);
  };

  const {
    data: voucherData,
    isLoading: voucherLoading,
    error: voucherError,
  } = useVendorVoucher(wallet?.address, queryService);

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useVendorTransaction(wallet?.address, queryService);

  return (
    <IonPage>
      <CustomHeader title="Home" />
      <IonContent fullscreen>
        {/* {isLoading && <IndeterminateLoader />} */}
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <Home
                projectSettings={projectSettings}
                handleReload={handleReload}
                voucherData={voucherData}
                transactionsData={transactionsData}
                loading={voucherLoading}
                transactionsLoading={transactionsLoading}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
