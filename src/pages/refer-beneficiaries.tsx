import { useBeneficiaryDetails } from "@api/beneficiaries";
import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ReferBeneficiaries from "@sections/refer-beneficiaries";
import { BENEFICIARY_VOUCHER_DETAILS } from "@types/beneficiaries";
import { useLocation } from "react-router";

type LocationState = {
  data: {
    voucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryAddress: string;
    from: "redeemVoucher" | "transactionResult";
  };
};

const ReferBeneficiariesPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  const { data: beneficiaryDetails } = useBeneficiaryDetails(
    data?.beneficiaryAddress
  );

  return (
    <IonPage>
      <CustomHeader title="Refer Beneficiaries" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferBeneficiaries data={{ ...data, beneficiaryDetails }} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferBeneficiariesPage;
