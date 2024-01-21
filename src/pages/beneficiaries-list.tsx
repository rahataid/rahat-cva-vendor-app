import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import BeneficiariesList from "@sections/settings/beneficiaries-settings/beneficiaries-list";
import CustomHeader from "@components/header/customHeader";
import useBeneficiaryStore from "@store/beneficiaries";

const BeneficiariesListPage: React.FC = () => {
  const { beneficiaries } = useBeneficiaryStore();
  return (
    <IonPage>
      <CustomHeader title="Beneficiaries List" showBackButton showStatus />
      <IonContent>
        <BeneficiariesList data={beneficiaries} />
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesListPage;
