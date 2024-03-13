import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { ITransactionItem } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";

type Props = {
  data: {
    transaction: ITransactionItem;
  };
};

const TransactionDetails = ({ data: { transaction } }: Props) => {
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
          <IonCol size="6">Beneficiary Name</IonCol>
          <IonCol size="6">
            {cropString(transaction?.beneficiaryAddress) || "-"}
          </IonCol>
          <IonCol size="6">Phone Number</IonCol>
          <IonCol size="6">
            {cropString(transaction?.beneficiaryAddress) || "-"}
          </IonCol>
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
          <IonCol size="6">
            {cropString(transaction?.transactionHash) || "-"}
          </IonCol>
          <IonCol size="6">Date</IonCol>
          <IonCol size="6">
            {formatDate(transaction?.blockTimestamp) || "-"}
          </IonCol>
        </IonRow>
      </IonGrid>
    </TransparentCard>
  );
};

export default TransactionDetails;
