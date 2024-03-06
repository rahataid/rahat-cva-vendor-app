import { useVendorTransaction, useVendorVoucher } from "@api/vendors";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Home from "../sections/home";
import "../theme/title.css";
import useAppStore from "@store/app";
import { useState } from "react";
import CustomHeader from "@components/header/customHeader";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import { useGraphService } from "@contexts/graph-query";

const HomePage: React.FC = () => {
  const { wallet, projectSettings, mockData } = useAppStore();
  const { queryService } = useGraphService();
  const vendorTransactions = mockData;

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender((prev) => !prev);
  };

  const { data, isLoading, error } = useVendorVoucher(
    wallet?.address,
    queryService
  );

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useVendorTransaction(wallet?.address, queryService);

  console.log(
    "VOUCHER STATS HOME",
    data?.freeVoucherRedeemed,
    data?.referredVoucherRedeemed
  );

  return (
    <IonPage>
      <CustomHeader title="Home" />
      <IonContent fullscreen>
        {/* {isLoading && <IndeterminateLoader />} */}
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <Home
                voucherData={data}
                transactionsData={transactionsData}
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
