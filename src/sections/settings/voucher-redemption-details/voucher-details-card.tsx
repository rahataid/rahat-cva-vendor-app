import CustomChip from "@components/chip/customChip";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import { VendorVoucherRedemptionDetails } from "../../../types/vendors";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { VoucherCurrencyDescription } from "@types/transactions";

type Props = {
  data: VendorVoucherRedemptionDetails;
  currencyDescription: VoucherCurrencyDescription;
};

const VoucherDetailsCard: FC<Props> = ({ data, currencyDescription }) => {
  const { t } = useTranslation();

  return (
    <IonItem mode="md" button={false} lines="full">
      <IonGrid className="px-0">
        <IonRow>
          <IonCol size="6" className="px-0 voucher-redemption-left-col">
            <IonRow>
              <IonText>
                <p>
                  {t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.LABELS.STATUS")}{" "}
                  {data?.status === "REQUESTED"
                    ? t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.DATA.REQUESTED")
                    : t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.DATA.APPROVED")}
                </p>
                <p className="amount-wrapper">
                  {t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.LABELS.AMOUNT")}{" "}
                  <>
                    {data?.voucherType === "DISCOUNTVOUCHER"
                      ? `${currencyDescription?.discountVoucher?.currency} ${
                          +data?.voucherNumber *
                          +currencyDescription?.discountVoucher?.price
                        }`
                      : `${currencyDescription?.discountVoucher?.currency} ${
                          +data?.voucherNumber *
                          +currencyDescription?.freeVoucher?.price
                        }`}
                  </>
                </p>
                {/* <p>{formatDate(data?.createdAt) || "-"}</p> */}
              </IonText>
            </IonRow>
          </IonCol>
          <IonCol size="6" className="voucher-redemption-right-col px-0">
            <CustomChip
              label={
                data?.voucherType === "DISCOUNTVOUCHER"
                  ? t("GLOBAL.TEXTS.VOUCHER_TYPE.DISCOUNT")
                  : t("GLOBAL.TEXTS.VOUCHER_TYPE.FREE")
              }
              color={
                data?.voucherType === "DISCOUNTVOUCHER" ? "success" : "warning"
              }
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default VoucherDetailsCard;
