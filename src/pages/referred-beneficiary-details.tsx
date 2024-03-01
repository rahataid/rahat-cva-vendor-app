import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import ReferredBeneficiaryDetails from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-details";
import { IBeneficiary } from "@types/beneficiaries";
import { useParams } from "react-router";

const data: IBeneficiary = {
  name: "Mani Byanjankar",
  phone: 9864587899,
  address: "Kathmandu",
  gender: "MALE",
  estimatedAge: 25,
  beneficiaryType: "REFERRED",
  walletAddress: "0x1234567890",
  token: "15",
  voucherType: "DISCOUNT_VOUCHER",
  createdAt: 1632960000000,
};

const ReferredBeneficiariesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("BENEFICIARY ID", id);
  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiary Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferredBeneficiaryDetails data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesDetailsPage;
