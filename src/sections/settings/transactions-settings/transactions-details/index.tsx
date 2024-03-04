import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { VOUCHER } from "@types/beneficiaries";
import { TRANSACTION_STATUS, TransactionDetail } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";

type Props = {
  data: TransactionDetail;
};

const TransactionDetails = ({ data }: Props) => {
  return (
    <TransparentCard>
      <IonGrid>
        <IonRow>
          <IonCol size="6">Status</IonCol>
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
          </IonCol>
          <IonCol size="6">Beneficiary Name</IonCol>
          <IonCol size="6">{data.name || "-"}</IonCol>
          <IonCol size="6">Phone Number</IonCol>
          <IonCol size="6">{data.phone || "-"}</IonCol>
          <IonCol size="6">Voucher Type</IonCol>
          <IonCol size="6">
            <IonText
              color={
                data.voucherType === VOUCHER.DISCOUNT_VOUCHER
                  ? "success"
                  : "warning"
              }
            >
              {data.voucherType}
            </IonText>
          </IonCol>
          <IonCol size="6">Voucher Symbol</IonCol>
          <IonCol size="6">{data.voucherSymbol || "-"}</IonCol>
          <IonCol size="6">Transaction Hash</IonCol>
          <IonCol size="6">{cropString(data.transactionHash) || "-"}</IonCol>
          <IonCol size="6">Date</IonCol>
          <IonCol size="6">{formatDate(data.createdAt) || "-"}</IonCol>
        </IonRow>
      </IonGrid>
    </TransparentCard>
  );
};

export default TransactionDetails;
