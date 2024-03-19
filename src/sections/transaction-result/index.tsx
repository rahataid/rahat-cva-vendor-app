import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { BENEFICIARY_VOUCHER_DETAILS, VOUCHER } from "@types/beneficiaries";
import { MetaTxResponse } from "@types/transactions";
import ResultChip from "@components/chip/statusChip";
import { useHistory } from "react-router";
import { cropString, formatDate } from "@utils/helperFunctions";
import useVoucherType from "@hooks/use-voucher-type";
import { generateCurrentTimestamp } from "../../utils/helperFunctions";

type Props = {
  data: {
    voucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryAddress: string;
    otpRes: MetaTxResponse;
  };
};

const TransactionResult = ({
  data: { voucher, beneficiaryAddress, otpRes },
}: Props) => {
  const history = useHistory();
  const { voucherType } = useVoucherType(voucher);
  const handleReferBeneficiaries = () => {
    history.push("/refer-beneficiaries", {
      data: { from: "transactionResult" },
    });
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
              <ResultChip status={otpRes?.status ? "SUCCESS" : "FAILED"} />
            </IonCol>
            {/* <IonCol size="6">Beneficiary Name</IonCol>
            <IonCol size="6">{cropString(beneficiaryAddress)}</IonCol> */}
            <IonCol size="6">Voucher Type</IonCol>
            <IonCol size="6">
              <IonText
                color={
                  voucherType === VOUCHER.DISCOUNT_VOUCHER
                    ? "success"
                    : "warning"
                }
              >
                {voucherType === VOUCHER.DISCOUNT_VOUCHER
                  ? "Discount Voucher"
                  : "Free Voucher"}
              </IonText>
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
                {data?.beneficiaryType === BENEFICIARY_TYPE.REFERRED
                  ? "Referred"
                  : "Enrolled"}
              </IonText>
            </IonCol> */}
            <IonCol size="6">Date</IonCol>
            <IonCol size="6">
              {formatDate(generateCurrentTimestamp()) || "-"}
            </IonCol>

            <IonCol size="6">Transaction Hash</IonCol>
            <IonCol size="6">{cropString(otpRes?.hash) || "-"}</IonCol>

            <IonCol size="6">Wallet Address</IonCol>
            <IonCol size="6">{cropString(beneficiaryAddress)}</IonCol>
            <br />
            <IonCol size="12">
              <IonText>
                <p>The beneficiary has redeemed the voucher successfully.</p>
              </IonText>
            </IonCol>

            {voucherType === "FREE_VOUCHER" && (
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
