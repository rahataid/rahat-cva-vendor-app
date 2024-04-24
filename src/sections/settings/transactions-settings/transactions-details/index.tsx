import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { IAllTransactionItem } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  data: IAllTransactionItem;
  voucherAddresses: {
    freeVoucherAddress: string;
    discountVoucherAddress: string;
  };
};

const TransactionDetails: FC<Props> = ({ data, voucherAddresses }) => {
  const { t } = useTranslation();
  return (
    <TransparentCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            {/* <IonCol size="6">Status</IonCol>
          <IonCol size="6">
            <IonText
              color={
                data.status === TRANSACTION_STATUS.SUCCESS
                  ? "success"
                  : "danger"
              }
            >
              {data.status}
            </IonText>
          </IonCol> */}
            <IonCol size="6">
              {t("TRANSACTION_DETAILS_PAGE.LABELS.TRANSACTION_TYPE")}
            </IonCol>
            <IonCol size="6">{data?.eventType || "-"}</IonCol>
            <IonCol size="6">
              {t("TRANSACTION_DETAILS_PAGE.LABELS.WALLET_ADDRESS")}
            </IonCol>
            <IonCol size="6">
              {data?.beneficiary ? cropString(data?.beneficiary) : "-"}
            </IonCol>
            {(data?.eventType == "Claim Processed" &&
              data?.token === voucherAddresses?.discountVoucherAddress && (
                <>
                  <IonCol size="6">
                    {t("TRANSACTION_DETAILS_PAGE.LABELS.VOUCHER_TYPE")}
                  </IonCol>
                  <IonCol size="6">
                    <IonText color="success">
                      {t("GLOBAL.TEXTS.VOUCHER_TYPE.DISCOUNT")}
                    </IonText>
                  </IonCol>
                  <IonCol size="6">
                    {t("TRANSACTION_DETAILS_PAGE.LABELS.BENEFICIARY_TYPE")}
                  </IonCol>
                  <IonCol size="6">
                    <IonText color="success">
                      {t("GLOBAL.TEXTS.BENEFICIARY_TYPE.REFERRED")}
                    </IonText>
                  </IonCol>
                </>
              )) ||
              (data?.token === voucherAddresses?.freeVoucherAddress && (
                <>
                  <IonCol size="6">
                    {t("TRANSACTION_DETAILS_PAGE.LABELS.VOUCHER_TYPE")}
                  </IonCol>
                  <IonCol size="6">
                    <IonText color="warning">
                      {" "}
                      {t("GLOBAL.TEXTS.VOUCHER_TYPE.FREE")}
                    </IonText>
                  </IonCol>
                  <IonCol size="6">
                    {t("TRANSACTION_DETAILS_PAGE.LABELS.BENEFICIARY_TYPE")}
                  </IonCol>
                  <IonCol size="6">
                    <IonText color="warning">
                      {t("GLOBAL.TEXTS.BENEFICIARY_TYPE.ENROLLED")}
                    </IonText>
                  </IonCol>
                </>
              ))}

            {/* <IonCol size="6">Phone Number</IonCol>
          <IonCol size="6">{cropString(data?.beneficiary) || "-"}</IonCol> */}

            <IonCol size="6">
              {t("TRANSACTION_DETAILS_PAGE.LABELS.TRANSACION_HASH")}
            </IonCol>
            <IonCol size="6">
              {data?.transactionHash ? cropString(data?.transactionHash) : "-"}
            </IonCol>
            <IonCol size="6">
              {t("TRANSACTION_DETAILS_PAGE.LABELS.DATE")}
            </IonCol>
            <IonCol size="6">
              {data?.blockTimestamp ? formatDate(data?.blockTimestamp) : "-"}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </TransparentCard>
  );
};

export default TransactionDetails;
