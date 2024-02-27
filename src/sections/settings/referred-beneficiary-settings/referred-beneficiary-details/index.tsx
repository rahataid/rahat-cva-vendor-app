import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { BENEFICIARY_TYPE, IBeneficiary, VOUCHER } from "@types/beneficiaries";
import { TRANSACTION_STATUS, TransactionDetail } from "@types/transactions";

type Props = {
  data: IBeneficiary;
};

const ReferredBeneficiaryDetails = ({ data }: Props) => {
  return (
    <TransparentCard>
      <IonGrid>
        <IonRow>
          <IonCol size="6">Beneficiary Name</IonCol>
          <IonCol size="6">{data.name}</IonCol>
          <IonCol size="6">Phone Number</IonCol>
          <IonCol size="6">{data.phone}</IonCol>
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
          <IonCol size="6">Gender</IonCol>
          <IonCol size="6">{data.gender}</IonCol>
          <IonCol size="6">Estimaged Age</IonCol>
          <IonCol size="6">{data.estimatedAge}</IonCol>
          <IonCol size="6">Beneficiary Type</IonCol>
          <IonCol size="6">
            <IonText
              color={
                data.beneficiaryType === BENEFICIARY_TYPE.ENROLLED
                  ? "success"
                  : "warning"
              }
            >
              {data.beneficiaryType}
            </IonText>
          </IonCol>
          <IonCol size="6">Wallet Address</IonCol>
          <IonCol size="6">{data.walletAddress}</IonCol>
          <IonCol size="6">Date</IonCol>
          <IonCol size="6">
            {new Date(data.createdAt)?.toLocaleString() || "-"}
          </IonCol>
        </IonRow>
      </IonGrid>
    </TransparentCard>
  );
};

export default ReferredBeneficiaryDetails;
