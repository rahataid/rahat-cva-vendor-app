import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiaryDetails from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-details";
import { IBeneficiary } from "@types/beneficiaries";
import { useParams } from "react-router";
import { mockBeneficiaries, mockReferredBeneficiaries } from "@utils/mockData";

// const data: IBeneficiary = {
//   name: "Mani Byanjankar",
//   phone: 9864587899,
//   address: "Kathmandu",
//   gender: "MALE",
//   estimatedAge: 25,
//   beneficiaryType: "REFERRED",
//   walletAddress: "0x1234567890",
//   token: "15",
//   voucherType: "DISCOUNT_VOUCHER",
//   createdAt: 1632960000000,
// };

const ReferredBeneficiariesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const beneficiaries = mockBeneficiaries.filter((el) => el.uuid === id);
  const beneficiary = beneficiaries.find((b) => b.uuid === id);
  console.log("BEN DETAILS", beneficiary);
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
