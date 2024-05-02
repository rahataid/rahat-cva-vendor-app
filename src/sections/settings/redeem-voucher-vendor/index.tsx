import { IonIcon, IonItem, IonList, IonText } from "@ionic/react";
import "./index.scss";
import {
  cartOutline,
  chevronForwardOutline,
  pricetagOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import TransparentCard from "../../../components/cards/Transparentcard/TransparentCard";
import { useTranslation } from "react-i18next";

const RedeemVoucherVendor = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const onFreeVoucherCardClick = () => {
    history.push("/tabs/settings/redeem-voucher-vendor/free", {
      data: { voucherType: "FREE_VOUCHER" },
    });
  };

  const onDiscountVoucherCardClick = () => {
    history.push("/tabs/settings/redeem-voucher-vendor/discount", {
      data: { voucherType: "DISCOUNT_VOUCHER" },
    });
  };
  return (
    <TransparentCard>
      <IonList mode="md">
        <IonItem button={true} onClick={onFreeVoucherCardClick}>
          <IonIcon icon={pricetagOutline} slot="start" color="warning" />
          <IonText>{t("REDEEM_VENDOR_VOUCHER_PAGE.FREE_VOUCHER")}</IonText>
          <IonIcon
            className="end-icon"
            icon={chevronForwardOutline}
            slot="end"
            color="medium"
          />
        </IonItem>
        <IonItem button={true} onClick={onDiscountVoucherCardClick}>
          <IonIcon icon={pricetagOutline} slot="start" color="success" />
          <IonText>{t("REDEEM_VENDOR_VOUCHER_PAGE.DISCOUNT_VOUCHER")}</IonText>
          <IonIcon
            className="end-icon"
            icon={chevronForwardOutline}
            slot="end"
            color="medium"
          />
        </IonItem>
      </IonList>
    </TransparentCard>
  );
};

export default RedeemVoucherVendor;
