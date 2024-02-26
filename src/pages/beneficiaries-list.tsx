import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import BeneficiariesList from "@sections/settings/beneficiaries-settings/beneficiaries-list";
import CustomHeader from "@components/header/customHeader";
import useBeneficiaryStore from "@store/beneficiary";
import { BENEFICIARY_TYPE, IBeneficiary, VOUCHER } from "@types/beneficiaries";

const BeneficiariesListPage: React.FC = () => {
  // const { beneficiaries } = useBeneficiaryStore();

  const beneficiaries: IBeneficiary[] = [
    {
      name: "Mani Byanjankar",
      phone: "9864587999",
      voucherType: VOUCHER.FREE_VOUCHER,
      beneficiaryType: BENEFICIARY_TYPE.ENROLLED,
      createdAt: 1631184000000,
    },
    {
      name: "Raghav Kattel",
      phone: "9851548752",
      voucherType: VOUCHER.DISCOUNT_VOUCHER,
      beneficiaryType: BENEFICIARY_TYPE.REFERRED,
      createdAt: 1631184000000,
    },
  ];
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
