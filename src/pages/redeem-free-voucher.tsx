import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { VOUCHER } from "@types/beneficiaries";
import { FC } from "react";
import RedeemVendorVoucherDetails from "@sections/settings/redeem-voucher-vendor/redeem-vendor-voucher-details";

const RedeemFreeVoucherPage: FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader
        title={t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.PAGE_TITLE.FREE_VOUCHER")}
        showBackButton
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <RedeemVendorVoucherDetails voucherType={VOUCHER.FREE_VOUCHER} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RedeemFreeVoucherPage;
