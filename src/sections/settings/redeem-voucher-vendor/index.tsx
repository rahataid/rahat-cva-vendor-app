import { IonIcon, IonItem, IonList, IonText } from "@ionic/react";
import "./index.scss";
import {
  cartOutline,
  chevronForwardOutline,
  pricetagOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import TransparentCard from "../../../components/cards/Transparentcard/TransparentCard";

const RedeemVoucherVendor = () => {
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
      {/* <IonGrid>
        <IonRow>
          <IonCol sizeMd="12" sizeLg="12" size="12">
            <FreeVoucherCard />
          </IonCol>
          <IonCol sizeMd="12" sizeLg="12" size="12">
            <DiscountVoucherCard />
          </IonCol>
        </IonRow>
      </IonGrid> */}
      <IonList mode="md">
        <IonItem button={true} onClick={onFreeVoucherCardClick}>
          <IonIcon icon={cartOutline} slot="start" />
          <IonText>Free Voucher</IonText>
          <IonIcon
            className="end-icon"
            icon={chevronForwardOutline}
            slot="end"
            color="medium"
          />
        </IonItem>
        <IonItem button={true} onClick={onDiscountVoucherCardClick}>
          <IonIcon icon={pricetagOutline} slot="start" />
          <IonText>Discount Voucher</IonText>
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
