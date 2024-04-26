import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent, IonList, IonText } from "@ionic/react";
import "./voucher-details-card.scss";
import VoucherDetailsCard from "./voucher-details-card";
import { VendorVoucherRedemptionDetails } from "../../../types/vendors";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { VoucherCurrencyDescription } from "@types/transactions";

type Props = {
  data: VendorVoucherRedemptionDetails[];
  currencyDescription: VoucherCurrencyDescription;
  isVoucherLoading: boolean;
  isFetchingVoucher: boolean;
};

const VoucherRedemptionDetails: FC<Props> = ({
  data,
  currencyDescription,
  isVoucherLoading,
  isFetchingVoucher,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TransparentCard>
        <IonCardContent className="voucher-details-container">
          {data?.length ? (
            <IonList>
              {data?.map((el: VendorVoucherRedemptionDetails, i: number) => (
                <VoucherDetailsCard
                  key={i}
                  data={el}
                  currencyDescription={currencyDescription}
                  isVoucherLoading={isVoucherLoading}
                  isFetchingVoucher={isFetchingVoucher}
                />
              ))}
            </IonList>
          ) : (
            <IonText className="ion-text-center">
              <p>{t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.NO_DATA")}</p>
            </IonText>
          )}
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default VoucherRedemptionDetails;
