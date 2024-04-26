import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  RefresherEventDetail,
} from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import VoucherRedemptionDetails from "@sections/settings/voucher-redemption-details";
import CustomRefresher from "@components/refresher/CustomRefresher";
import {
  useProjectVoucher,
  useVendorVoucherRedemptionList,
} from "@api/vendors";
import { FC } from "react";
import ListSkeletonCard from "@components/loaders/skeleton/card/list";
import { useTranslation } from "react-i18next";
import { useGraphService } from "@contexts/graph-query";

const VoucherRedemptionDetailsPage: FC = () => {
  const { t } = useTranslation();
  const { queryService } = useGraphService();
  const { data, isLoading, error, refetch, isFetching } =
    useVendorVoucherRedemptionList();
  const {
    data: currencyDescription,
    isLoading: isVoucherLoading,
    error: voucherError,
    refetch: refetchVoucher,
    isFetching: isFetchingVoucher,
  } = useProjectVoucher(queryService);
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };
  return (
    <IonPage>
      <CustomHeader
        title={t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <CustomRefresher handleRefresh={handleRefresh} />
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              {isFetching ? (
                <ListSkeletonCard length={5} />
              ) : (
                <VoucherRedemptionDetails
                  data={data}
                  currencyDescription={currencyDescription}
                  isVoucherLoading={isVoucherLoading}
                  isFetchingVoucher={isFetchingVoucher}
                />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VoucherRedemptionDetailsPage;
