import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import RedeemVendorVoucherDetails from "../sections/settings/redeem-voucher-vendor/redeem-vendor-voucher-details";
import { useTranslation } from "react-i18next";
import { VOUCHER } from "@types/beneficiaries";

const RedeemDiscountVoucherPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader
        title={t(
          "REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.PAGE_TITLE.DISCOUNT_VOUCHER"
        )}
        showBackButton
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <RedeemVendorVoucherDetails
                voucherType={VOUCHER.DISCOUNT_VOUCHER}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RedeemDiscountVoucherPage;
