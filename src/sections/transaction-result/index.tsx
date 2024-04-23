import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import { MetaTxResponse } from "@types/transactions";
import ResultChip from "@components/chip/statusChip";
import { useHistory } from "react-router";
import { cropString, formatDate } from "@utils/helperFunctions";
import useVoucherType from "@hooks/use-voucher-type";
import { generateCurrentTimestamp } from "../../utils/helperFunctions";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  data: {
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
    otpRes: MetaTxResponse;
  };
};

const TransactionResult: FC<Props> = ({
  data: { beneficiaryDetails, beneficiaryVoucher, otpRes },
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { voucherType } = useVoucherType(beneficiaryVoucher);
  const handleReferBeneficiaries = () => {
    history.push("/refer-beneficiaries", {
      data: {
        from: "transactionResult",
        beneficiaryDetails,
        beneficiaryVoucher,
      },
    });
  };
  const handleDone = () => {
    history.push("/tabs/home");
  };
  return (
    <>
      <TransparentCard>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <ResultChip status="SUCCESS" />
              </IonCol>
              {/* <IonCol size="6">Beneficiary Name</IonCol>
            <IonCol size="6">{cropString(beneficiaryAddress)}</IonCol> */}
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.VOUCHER_TYPE")}
              </IonCol>
              <IonCol size="6">
                <IonText
                  color={
                    voucherType === VOUCHER.DISCOUNT_VOUCHER
                      ? "success"
                      : "warning"
                  }
                >
                  {voucherType === VOUCHER.DISCOUNT_VOUCHER
                    ? t("GLOABLS.TEXTS.VOUCHER_TYPE.DISCOUNT")
                    : t("GLOABLS.TEXTS.VOUCHER_TYPE.FREE")}
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
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.DATE")}
              </IonCol>
              <IonCol size="6">
                {formatDate(generateCurrentTimestamp()) || "-"}
              </IonCol>

              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.TRANSACTION_HASH")}
              </IonCol>
              <IonCol size="6">
                {otpRes?.txHash ? cropString(otpRes?.txHash) : "-"}
              </IonCol>

              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.WALLET_ADDRESS")}
              </IonCol>
              <IonCol size="6">
                {beneficiaryDetails?.walletAddress
                  ? cropString(beneficiaryDetails?.walletAddress)
                  : "-"}
              </IonCol>
              <br />
              <br />
              <br />
              <IonCol size="12">
                <IonText>
                  <p>{t("TRANSACTION_RESULT_PAGE.SUCCESS_MSG")}</p>
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
                      {t("TRANSACTION_RESULT_PAGE.BUTTONS.REFER")}
                    </IonButton>
                  </IonCol>
                </>
              )}

              <IonRow className="gap-5"></IonRow>
              <IonCol size="12">
                <IonButton color="primary" expand="block" onClick={handleDone}>
                  {t("TRANSACTION_RESULT_PAGE.BUTTONS.DONE")}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default TransactionResult;
