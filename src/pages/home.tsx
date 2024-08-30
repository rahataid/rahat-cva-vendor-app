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
import { useVendorDetails, useVendorStats } from "../api/vendors";
import { useProjectSettings } from "../api/project-settings";
import CustomRefresher from "@components/refresher/CustomRefresher";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const HomePage: FC = () => {
  const { t } = useTranslation();
  const { projectSettings, currentUser } = useAppStore();
  const { queryService } = useGraphService();

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender((prev) => !prev);
  };

  // const {
  //   data: transactionsData,
  //   isLoading: transactionsLoading,
  //   error: transactionsError,
  //   refetch: refetchTransactions,
  //   isFetching: isFetchingTransactions,
  // } = useVendorTransaction(queryService);

  useVendorDetails({ forceRender });

  const {
    data: projectSettingsData,
    isLoading: settingsLoading,
    isFetching: isSettingsFetching,
    error: settingsError,
  } = useProjectSettings();

  const {
    data: vendorStats,
    isFetching: isVendorStatsFetching,
    error: vendorStatsError,
  } = useVendorStats();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    event.detail.complete();
  };

  useEffect(() => {
    if (projectSettingsData && projectSettings?.subGraph?.url) {
      window.location.reload();
    }
  }, [projectSettingsData, projectSettings?.subGraph?.url]);

  return (
    <IonPage>
      <CustomHeader title={t("HOME_PAGE.PAGE_TITLE")} />
      <IonContent fullscreen>
        <CustomRefresher handleRefresh={handleRefresh} />
        {/* {isVendorApprovedFetching && <IndeterminateLoader />} */}
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <Home
                currentUser={currentUser}
                projectSettings={projectSettings}
                handleReload={handleReload}
                isSettingsFetching={isSettingsFetching}
                transactionsData={[]}
                transactionsLoading={false}
                vendorStats={vendorStats}
                vendorStatsLoading={isVendorStatsFetching}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
