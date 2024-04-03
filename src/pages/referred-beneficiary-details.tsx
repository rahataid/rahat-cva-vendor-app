import { FC } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiaryDetails from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-details";
import { useLocation, useParams } from "react-router";
import { REFERRED_BENEFICIARY_DETAILS } from "../types/beneficiaries";

type LocationState = {
  data: {
    beneficiary: REFERRED_BENEFICIARY_DETAILS;
  };
};

const ReferredBeneficiariesDetailsPage: FC = () => {
  const location = useLocation<LocationState>();
  const {
    data: { beneficiary },
  } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiary Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferredBeneficiaryDetails data={beneficiary} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesDetailsPage;
