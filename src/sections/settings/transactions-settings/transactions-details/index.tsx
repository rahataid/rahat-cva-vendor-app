import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { IAllTransactionItem } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";

type Props = {
  data: IAllTransactionItem;
};

const TransactionDetails = ({ data }: Props) => {
  console.log("details last", data);
  return (
    <TransparentCard>
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
          <IonCol size="6">Transaction Type</IonCol>
          <IonCol size="6">{data?.eventType || "-"}</IonCol>
          <IonCol size="6">Beneficiary Wallet Address</IonCol>
          <IonCol size="6">{cropString(data?.beneficiary) || "-"}</IonCol>
          {/* <IonCol size="6">Phone Number</IonCol>
          <IonCol size="6">{cropString(data?.beneficiary) || "-"}</IonCol> */}
          {/* <IonCol size="6">Beneficiary Type</IonCol>
          <IonCol size="6">
            <IonText
              color={
                data.beneficiaryType === BENEFICIARY_TYPE.REFERRED
                  ? "success"
                  : "warning"
              }
            >
              {data.beneficiaryType === BENEFICIARY_TYPE.REFERRED
                ? "Referred"
                : "Enrolled"}
            </IonText>
          </IonCol> */}
          {/* <IonCol size="6">Voucher Type</IonCol>
          <IonCol size="6">
            <IonText
              color={
                data.voucherType === VOUCHER.DISCOUNT_VOUCHER
                  ? "success"
                  : "warning"
              }
            >
              {data.voucherType === VOUCHER.DISCOUNT_VOUCHER
                ? "Discount Voucher"
                : "Free Voucher"}
            </IonText>
          </IonCol> */}

          <IonCol size="6">Transaction Hash</IonCol>
          <IonCol size="6">{cropString(data?.transactionHash) || "-"}</IonCol>
          <IonCol size="6">Date</IonCol>
          <IonCol size="6">{formatDate(data?.blockTimestamp) || "-"}</IonCol>
        </IonRow>
      </IonGrid>
    </TransparentCard>
  );
};

export default TransactionDetails;
