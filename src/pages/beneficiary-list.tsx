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
import { useReferredBeneficiariesList } from "@api/beneficiaries";
import CustomRefresher from "@components/refresher/CustomRefresher";
import CardComponent from "@sections/home/home-card";
import { useTranslation } from "react-i18next";
import BeneficiariesList from "@sections/beneficiaries/beneficiary-list";

const BeneficiariesListPage: FC = () => {
  const { t } = useTranslation();
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
      <CustomHeader title={t("BENEFICIARIES_PAGE.PAGE_TITLE")} />
      <IonContent>
        <CustomRefresher handleRefresh={handleRefresh} />
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <CardComponent
                title={beneficiaries?.length || 0}
                subtitle={t("BENEFICIARIES_PAGE.CARD_TITLE")}
                loading={isFetching}
              />
              <BeneficiariesList
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

export default BeneficiariesListPage;
