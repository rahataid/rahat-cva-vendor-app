import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import RedeemVoucherVendor from "../sections/settings/redeem-voucher-vendor";
import CustomHeader from "../components/header/customHeader";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const RedeemVoucherVendorPage: FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader
        title={t("REDEEM_VENDOR_VOUCHER_PAGE.PAGE_TITLE")}
        showBackButton
      />
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
