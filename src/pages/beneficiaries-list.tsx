import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import BeneficiariesList from "@sections/settings/beneficiaries-settings/beneficiaries-list";
import CustomHeader from "@components/header/customHeader";
import useBeneficiaryStore from "@store/beneficiary";

const BeneficiariesListPage: React.FC = () => {
  const { beneficiaries } = useBeneficiaryStore();
  return (
    <IonPage>
      <CustomHeader title="Beneficiaries List" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <BeneficiariesList data={beneficiaries} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesListPage;
