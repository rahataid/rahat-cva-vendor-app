import { useVendorTransaction, useVendorVoucher } from "@api/vendors";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  RefresherEventDetail,
} from "@ionic/react";
import Home from "../sections/home";
import "../theme/title.css";
import useAppStore from "@store/app";
import { useEffect, useState } from "react";
import CustomHeader from "@components/header/customHeader";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import { useGraphService } from "@contexts/graph-query";
import { useVendorDetails } from "../api/vendors";
import { useProjectSettings } from "../api/project-settings";
import CustomRefresher from "@components/refresher/CustomRefresher";

const HomePage: React.FC = () => {
  const { projectSettings, currentUser } = useAppStore();
  const { queryService } = useGraphService();

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender((prev) => !prev);
  };

  const {
    data: voucherData,
    isLoading: voucherLoading,
    error: voucherError,
    refetch: refetchVoucher,
    isFetching: isFetchingVoucher,
  } = useVendorVoucher(queryService);

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
    refetch: refetchTransactions,
    isFetching: isFetchingTransactions,
  } = useVendorTransaction(queryService);

  const {
    data: vendorDetails,
    isLoading: vendorDetailsLoading,
    error: vendorDetailsError,
  } = useVendorDetails({ forceRender });

  const {
    data: projectSettingsData,
    isLoading: settingsLoading,
    error: settingsError,
  } = useProjectSettings();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetchVoucher();
    await refetchTransactions();
    event.detail.complete();
  };

  useEffect(() => {
    if (projectSettingsData && projectSettings?.subGraph?.url) {
      window.location.reload();
    }
  }, [projectSettingsData, projectSettings?.subGraph?.url]);

  return (
    <IonPage>
      <CustomHeader title="Home" />
      <IonContent fullscreen>
        <CustomRefresher handleRefresh={handleRefresh} />
        {/* {isLoading && <IndeterminateLoader />} */}
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <Home
                currentUser={currentUser}
                projectSettings={projectSettings}
                handleReload={handleReload}
                voucherData={voucherData}
                transactionsData={transactionsData}
                loading={isFetchingVoucher}
                transactionsLoading={isFetchingTransactions}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
