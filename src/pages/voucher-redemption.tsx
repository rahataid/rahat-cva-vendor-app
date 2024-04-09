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
import { useVendorVoucherRedemptionList } from "@api/vendors";
import { FC } from "react";
import DetailsSkeletonCard from "@components/loaders/skeleton/card/details";

const VoucherRedemptionDetailsPage: FC = () => {
  const { data, isLoading, error, refetch } = useVendorVoucherRedemptionList();
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };
  return (
    <IonPage>
      <CustomHeader title="Voucher Redemption Details" showBackButton />
      <IonContent>
        <CustomRefresher handleRefresh={handleRefresh} />
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              {isLoading ? (
                <DetailsSkeletonCard />
              ) : (
                <VoucherRedemptionDetails data={data} />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VoucherRedemptionDetailsPage;
