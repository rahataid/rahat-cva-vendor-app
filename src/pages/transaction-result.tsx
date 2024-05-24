import { FC } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import TransactionResult from "@sections/transactions/transaction-result";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "@types/beneficiaries";
import { useLocation } from "react-router";
import { MetaTxResponse, UpdateStatusRes } from "@types/transactions";
import { useTranslation } from "react-i18next";

interface LocationState {
  data: {
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    amount: number;
    transactionRes: UpdateStatusRes;
  };
}

const TransactionResultPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title={t("TRANSACTION_RESULT_PAGE.PAGE_TITLE")} />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionResult data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionResultPage;
