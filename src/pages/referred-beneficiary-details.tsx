import { FC } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiaryDetails from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-details";
import { useLocation, useParams } from "react-router";
import { REFERRED_BENEFICIARY_DETAILS } from "../types/beneficiaries";
import { useReferredBeneficiariesDetails } from "@api/beneficiaries";
import DetailsSkeletonCard from "@components/loaders/skeleton/card/details";
import { useTranslation } from "react-i18next";

type LocationState = {
  data: {
    beneficiary: REFERRED_BENEFICIARY_DETAILS;
  };
};

const ReferredBeneficiariesDetailsPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  const { uuid } = useParams<{ uuid: string }>();

  const {
    data: beneficiaryDetails,
    isLoading,
    error,
  } = useReferredBeneficiariesDetails({
    uuid,
    beneficiaryDetails: data?.beneficiary,
  });

  return (
    <IonPage>
      <CustomHeader
        title={t("REFERRED_BENEFICIARY_DETAILS_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              {!data && isLoading ? (
                <DetailsSkeletonCard length={10} />
              ) : (
                <>
                  <ReferredBeneficiaryDetails
                    data={
                      data?.beneficiary ? data?.beneficiary : beneficiaryDetails
                    }
                  />
                </>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesDetailsPage;
