import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiariesList from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-list";
import useAppStore from "@store/app";

const ReferredBeneficiariesListPage: React.FC = () => {
  // const { vendorTransactions } = useTransactionStore();
  const { mockData, setMockData } = useAppStore();
  let Beneficiaries = mockData;
  Beneficiaries = mockData.filter((el) => el.beneficiaryType === "REFERRED");

  const handleDelete = (uuid: string) => {
    setMockData(mockData.filter((el) => el.uuid !== uuid));
  };

  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiaries List" />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferredBeneficiariesList
                data={Beneficiaries}
                handleDelete={handleDelete}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesListPage;
