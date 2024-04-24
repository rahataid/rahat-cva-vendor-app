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
import { MetaTxResponse, UpdateStatusRes } from "@types/transactions";
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
    redeemRes: UpdateStatusRes;
  };
};

const TransactionResult: FC<Props> = ({
  data: { beneficiaryDetails, beneficiaryVoucher, redeemRes },
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
                    ? t("GLOBAL.TEXTS.VOUCHER_TYPE.DISCOUNT")
                    : t("GLOBAL.TEXTS.VOUCHER_TYPE.FREE")}
                </IonText>
              </IonCol>
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.CHECKUP_STATUS")}
              </IonCol>
              <IonCol size="6">
                {redeemRes?.eyeCheckUp
                  ? t("GLOBAL.TEXTS.SELECT.CHECKUP_DONE")
                  : t("GLOBAL.TEXTS.SELECT.CHECKUP_NOT_DONE")}
              </IonCol>
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.GLASSES_STATUS")}
              </IonCol>
              <IonCol size="6">
                {voucherType === VOUCHER.FREE_VOUCHER && (
                  <IonText>
                    {redeemRes?.glassRequired
                      ? t("GLOBAL.TEXTS.SELECT.GLASSES_REQUIRED")
                      : t("GLOBAL.TEXTS.SELECT.GLASSES_NOT_REQUIRED")}
                  </IonText>
                )}
                {voucherType === VOUCHER.DISCOUNT_VOUCHER && (
                  <IonText>
                    {redeemRes?.glassRequired
                      ? t("GLOBAL.TEXTS.SELECT.GLASSES_BOUGHT")
                      : t("GLOBAL.TEXTS.SELECT.GLASSES_NOT_BOUGHT")}
                  </IonText>
                )}
              </IonCol>{" "}
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.TRANSACTION_HASH")}
              </IonCol>
              <IonCol size="6">
                {redeemRes?.txHash ? cropString(redeemRes?.txHash) : "-"}
              </IonCol>
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.WALLET_ADDRESS")}
              </IonCol>
              <IonCol size="6">
                {beneficiaryDetails?.walletAddress
                  ? cropString(beneficiaryDetails?.walletAddress)
                  : "-"}
              </IonCol>
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.DATE")}
              </IonCol>
              <IonCol size="6">
                {redeemRes?.createdAt
                  ? formatDate(new Date(redeemRes?.createdAt) / 1000)
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
