import {
  useIsVendorApproved,
  useVendorFilteredTransaction,
  useVendorTransaction,
  useVendorVoucher,
} from "@api/vendors";
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
import { VOUCHER } from "@types/beneficiaries";
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

  // const {
  //   data: filteredTransactionsData,
  //   isFetching: isFetchingFilteredTransactions,
  // } = useVendorFilteredTransaction(queryService, "FREE_VOUCHER");

  const {
    data: referredTransactions,
    isLoading: referredLoading,
    isFetching: isReferredFetching,
    refetch: refetchDiscountTransactions,
  } = useVendorFilteredTransaction(
    "vendorFilteredTransactionDiscount",
    queryService,
    VOUCHER.DISCOUNT_VOUCHER
  );

  const {
    data: enrolledTransactions,
    isLoading: enrolledLoading,
    isFetching: isEnrolledFetching,
    refetch: refetchFreeTransactions,
  } = useVendorFilteredTransaction(
    "vendorFilteredTransactionFree",
    queryService,
    VOUCHER.FREE_VOUCHER
  );

  const {
    data: vendorDetails,
    isLoading: vendorDetailsLoading,
    error: vendorDetailsError,
  } = useVendorDetails({ forceRender });

  const { data: isVendorApproved } = useIsVendorApproved();

  const {
    data: projectSettingsData,
    isLoading: settingsLoading,
    isFetching: isSettingsFetching,
    error: settingsError,
  } = useProjectSettings();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    // await Promise.all([
    await refetchVoucher(),
      await refetchTransactions(),
      await refetchDiscountTransactions(),
      await refetchFreeTransactions(),
      // ]);
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
        {/* {isSettingsFetching && <IndeterminateLoader />} */}
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <Home
                currentUser={currentUser}
                projectSettings={projectSettings}
                handleReload={handleReload}
                voucherData={voucherData}
                loading={isFetchingVoucher}
                transactionsData={transactionsData}
                transactionsLoading={isFetchingTransactions}
                isSettingsFetching={isSettingsFetching}
                enrolledTransactions={enrolledTransactions}
                isEnrolledFetching={isEnrolledFetching}
                referredTransactions={referredTransactions}
                isReferredFetching={isReferredFetching}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
