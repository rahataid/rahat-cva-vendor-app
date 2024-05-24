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
} from "@types/beneficiaries";
import { UpdateStatusRes } from "@types/transactions";
import ResultChip from "@components/chip/statusChip";
import { useHistory } from "react-router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { cropString } from "@utils/helperFunctions";

type Props = {
  data: {
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    amount: number;
    transactionRes: UpdateStatusRes;
  };
};

const TransactionResult: FC<Props> = ({
  data: { beneficiaryDetails, amount, transactionRes },
}) => {
  const { t } = useTranslation();
  const history = useHistory();

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
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.BENEFICIARY_NAME")}
              </IonCol>
              <IonCol size="6">
                {beneficiaryDetails?.piiData?.name || "-"}
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
                {t("TRANSACTION_RESULT_PAGE.LABELS.AMOUNT")}
              </IonCol>
              <IonCol size="6">{amount | "-"}</IonCol>
              <IonCol size="6">
                {t("TRANSACTION_RESULT_PAGE.LABELS.TRANSACTION_HASH")}
              </IonCol>
              <IonCol size="6">
                {transactionRes?.txHash
                  ? cropString(transactionRes?.txHash)
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
