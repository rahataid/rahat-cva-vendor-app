import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import BeneficiariesList from "@sections/settings/beneficiaries-settings/beneficiaries-list";
import useAppStore from "@store/app";
import CustomHeader from "@components/header/customHeader";

const BeneficiariesListPage: React.FC = () => {
  const { beneficiaries } = useAppStore();
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
