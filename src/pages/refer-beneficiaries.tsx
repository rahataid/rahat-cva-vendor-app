import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import ReferBeneficiaries from "@sections/refer-beneficiaries";
import ReferredBeneficiariesList from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-list";

const ReferBeneficiariesPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Refer Beneficiaries" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferBeneficiaries />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferBeneficiariesPage;
