import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";
import ReferredBeneficiariesList from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-list";
import { IBeneficiary } from "@types/beneficiaries";
import { mockBeneficiaries, mockReferredBeneficiaries } from "@utils/mockData";

const ReferredBeneficiariesListPage: React.FC = () => {
  // const { vendorTransactions } = useTransactionStore();
  let Beneficiaries = mockBeneficiaries;
  Beneficiaries = mockBeneficiaries.filter(
    (el) => el.beneficiaryType === "REFERRED"
  );

  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiaries List" />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferredBeneficiariesList data={Beneficiaries} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesListPage;
