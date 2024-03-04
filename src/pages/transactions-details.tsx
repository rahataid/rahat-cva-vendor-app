import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";
import TransactionDetails from "@sections/settings/transactions-settings/transactions-details";
import { TRANSACTION_STATUS, TransactionDetail } from "@types/transactions";
import { BENEFICIARY_TYPE, VOUCHER } from "@types/beneficiaries";
import { useParams } from "react-router";
import { mockBeneficiaries } from "@utils/mockData";

// const details: TransactionDetail = {
//   beneficiaryName: "Mani Byanjankar",
//   phone: "9864587899",
//   status: TRANSACTION_STATUS.SUCCESS,
//   beneficiaryType: BENEFICIARY_TYPE.ENROLLED,
//   createdAt: 1632960000000,
//   transactionHash: "0x1234567890",
//   voucherSymbol: "USDT",
//   voucherType: VOUCHER.FREE_VOUCHER,
// };

const TransactionsDetailPage: React.FC = () => {
  //   const { vendorTransactions } = useTransactionStore();
  const { txHash: uuid } = useParams<{ txHash: string }>();
  console.log("uuid", uuid);
  const beneficiaries = mockBeneficiaries;
  const data = beneficiaries.find((item) => item.uuid === uuid);
  console.log("data", data);

  return (
    <IonPage>
      <CustomHeader title="Transaction Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionDetails data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsDetailPage;
