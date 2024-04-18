import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ReferBeneficiaries from "@sections/refer-beneficiaries";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "@types/beneficiaries";
import { useLocation } from "react-router";

type LocationState = {
  data: {
    beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    from: "redeemVoucher" | "transactionResult";
  };
};

const ReferBeneficiariesPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };

  return (
    <IonPage>
      <CustomHeader title="Refer Beneficiaries" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferBeneficiaries data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferBeneficiariesPage;
