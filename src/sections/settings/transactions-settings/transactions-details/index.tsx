import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { IAllTransactionItem } from "@types/transactions";
import { cropString, formatDate } from "@utils/helperFunctions";
import { FC } from "react";

type Props = {
  data: IAllTransactionItem;
  voucherAddresses: {
    freeVoucherAddress: string;
    discountVoucherAddress: string;
  };
};

const TransactionDetails: FC<Props> = ({ data, voucherAddresses }) => {
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
            <IonCol size="6">Transaction Type</IonCol>
            <IonCol size="6">{data?.eventType || "-"}</IonCol>
            <IonCol size="6">Beneficiary Wallet Address</IonCol>
            <IonCol size="6">
              {data?.beneficiary ? cropString(data?.beneficiary) : "-"}
            </IonCol>
            {(data?.eventType == "Claim Processed" &&
              data?.token === voucherAddresses?.discountVoucherAddress && (
                <>
                  <IonCol size="6">Voucher Type</IonCol>
                  <IonCol size="6">
                    <IonText color="success">Discount Voucher</IonText>
                  </IonCol>
                  <IonCol size="6">Beneficiary Type</IonCol>
                  <IonCol size="6">
                    <IonText color="success">Referred</IonText>
                  </IonCol>
                </>
              )) ||
              (data?.token === voucherAddresses?.freeVoucherAddress && (
                <>
                  <IonCol size="6">Voucher Type</IonCol>
                  <IonCol size="6">
                    <IonText color="warning">Free Voucher</IonText>
                  </IonCol>
                  <IonCol size="6">Beneficiary Type</IonCol>
                  <IonCol size="6">
                    <IonText color="warning">Enrolled</IonText>
                  </IonCol>
                </>
              ))}

            {/* <IonCol size="6">Phone Number</IonCol>
          <IonCol size="6">{cropString(data?.beneficiary) || "-"}</IonCol> */}

            <IonCol size="6">Transaction Hash</IonCol>
            <IonCol size="6">
              {data?.transactionHash ? cropString(data?.transactionHash) : "-"}
            </IonCol>
            <IonCol size="6">Date</IonCol>
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
