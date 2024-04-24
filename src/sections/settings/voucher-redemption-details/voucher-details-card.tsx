import CustomChip from "@components/chip/customChip";
import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import { formatDate } from "@utils/helperFunctions";
import { VendorVoucherRedemptionDetails } from "../../../types/vendors";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  data: VendorVoucherRedemptionDetails;
};

const VoucherDetailsCard: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <IonItem mode="md" button={false} lines="full">
      <IonGrid className="px-0">
        <IonRow>
          <IonCol size="6" className="px-0">
            <IonText>
              <p>
                {t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.LABELS.STATUS")}{" "}
                {data?.status === "REQUESTED" ? "Requested" : "Approved"}
              </p>
              <p>
                {t("REDEEM_VENDOR_VOUCHER_LIST_PAGE.LABELS.AMOUNT")}{" "}
                {data?.voucherNumber}
              </p>
              {/* <p>{formatDate(data?.createdAt) || "-"}</p> */}
            </IonText>
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
