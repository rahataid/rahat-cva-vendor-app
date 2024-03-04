import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { BENEFICIARY_TYPE, IBeneficiary, VOUCHER } from "@types/beneficiaries";
import { TRANSACTION_STATUS, TransactionDetail } from "@types/transactions";
import ResultChip from "@components/chip/statusChip";
import { useHistory } from "react-router";
import { cropString, formatDate } from "@utils/helperFunctions";

type Props = {
  data: IBeneficiary;
};

const TransactionResult = ({ data }: Props) => {
  const history = useHistory();
  const handleReferBeneficiaries = () => {
    history.push("/refer-beneficiaries");
  };
  const handleDone = () => {
    history.push("/tabs/home");
  };
  return (
    <>
      <TransparentCard>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <ResultChip status={data?.status} />
            </IonCol>
            <IonCol size="6">Beneficiary Name</IonCol>
            <IonCol size="6">{data?.name}</IonCol>
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
            <IonCol size="6">Beneficiary Type</IonCol>
            <IonCol size="6">
              <IonText
                color={
                  data.beneficiaryType === BENEFICIARY_TYPE.ENROLLED
                    ? "success"
                    : "warning"
                }
              >
                {data?.beneficiaryType}
              </IonText>
            </IonCol>
            <IonCol size="6">Date</IonCol>
            <IonCol size="6">{formatDate(`${new Date()}`) || "-"}</IonCol>

            <IonCol size="6">Transaction Hash</IonCol>
            <IonCol size="6">{cropString(data?.transactionHash) || "-"}</IonCol>
            <IonCol size="6">Voucher Symbol</IonCol>
            <IonCol size="6">{data?.voucherSymbol}</IonCol>
            <IonCol size="6">Phone</IonCol>
            <IonCol size="6">{data?.phone}</IonCol>
            <br />
            <IonCol size="12">
              <IonText>
                <p>The beneficiary has redeemed the voucher successfully.</p>
              </IonText>
            </IonCol>

            {data?.voucherType === "FREE_VOUCHER" && (
              <>
                <br />
                <IonCol size="12">
                  <IonButton
                    color="warning"
                    expand="block"
                    onClick={handleReferBeneficiaries}
                  >
                    Refer Beneficiaries
                  </IonButton>
                </IonCol>
              </>
            )}

            <IonRow className="gap-5"></IonRow>
            <IonCol size="12">
              <IonButton color="primary" expand="block" onClick={handleDone}>
                Done
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </TransparentCard>
    </>
  );
};

export default TransactionResult;
