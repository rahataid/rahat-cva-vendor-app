import { FC } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiariesList from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-list";
import { useReferredBeneficiariesList } from "@api/beneficiaries";

const ReferredBeneficiariesListPage: FC = () => {
  const {
    data: beneficiaries,
    isLoading,
    error,
  } = useReferredBeneficiariesList();
  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiaries List" />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferredBeneficiariesList
                beneficiaries={beneficiaries}
                loading={isLoading}
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
