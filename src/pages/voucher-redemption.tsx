import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import VoucherRedemptionDetails from "@sections/settings/voucher-redemption-details";
import { mockBeneficiaries } from "@utils/mockData";

const VoucherRedemptionDetailsPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Voucher Redemption Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <VoucherRedemptionDetails data={mockBeneficiaries} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default VoucherRedemptionDetailsPage;