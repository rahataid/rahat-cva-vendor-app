import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import RedeemVoucherVendor from "../sections/settings/redeem-voucher-vendor";
import CustomHeader from "../components/header/customHeader";

const RedeemVoucherVendorPage = () => {
  return (
    <IonPage>
      <CustomHeader title="Redeem Voucher" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <RedeemVoucherVendor />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherVendorPage;
