import CustomChip from "@components/chip/customChip";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import { formatDate } from "@utils/helperFunctions";
import { VendorVoucherRedemptionDetails } from "../../../types/vendors";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { VoucherCurrencyDescription } from "@types/transactions";

type Props = {
  data: VendorVoucherRedemptionDetails;
  currencyDescription: VoucherCurrencyDescription;
  isVoucherLoading: boolean;
  isFetchingVoucher: boolean;
};

const VoucherDetailsCard: FC<Props> = ({
  data,
  currencyDescription,
  isVoucherLoading,
  isFetchingVoucher,
}) => {
  const { t } = useTranslation();
  console.log(
    data?.voucherNumber,
    currencyDescription?.discountVoucher?.currency
  );
  console.log("xxxxxx", isFetchingVoucher, isVoucherLoading, "xxxxxx");
  return (
    <IonItem mode="md" button={false} lines="full">
      <IonGrid className="px-0">
        <IonRow>
          <IonCol size="6" className="px-0">
            <IonRow>
              <IonText>
                <p>
                  {t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.LABELS.STATUS")}{" "}
                  {data?.status === "REQUESTED"
                    ? t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.DATA.REQUESTED")
                    : t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.DATA.APPROVED")}
                </p>
                <p>
                  {t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.LABELS.AMOUNT")}{" "}
                  {isVoucherLoading ? (
                    <IonSkeletonText animated={true} style={{ width: "25%" }} />
                  ) : (
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
                  )}
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
