import { FC } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  RefresherEventDetail,
} from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiariesList from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-list";
import { useReferredBeneficiariesList } from "@api/beneficiaries";

import CustomRefresher from "@components/refresher/CustomRefresher";
import CardComponent from "@sections/home/home-card";

const ReferredBeneficiariesListPage: FC = () => {
  const {
    data: beneficiaries,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useReferredBeneficiariesList();
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };
  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiaries List" />
      <IonContent>
        <CustomRefresher handleRefresh={handleRefresh} />
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <CardComponent
                title={beneficiaries?.length || 0}
                subtitle="Total Beneficiares Referred"
                loading={isFetching}
              />
              <ReferredBeneficiariesList
                beneficiaries={beneficiaries}
                loading={isFetching}
                error={error}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesListPage;
