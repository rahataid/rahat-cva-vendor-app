import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import RedeemVendorVoucherDetails from "../sections/settings/redeem-voucher-vendor/redeem-vendor-voucher-details";

const RedeemDiscountVoucherPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Redeem Discount Voucher" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <RedeemVendorVoucherDetails voucherType={"DISCOUNT_VOUCHER"} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RedeemDiscountVoucherPage;
