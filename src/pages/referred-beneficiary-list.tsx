import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";
import ReferredBeneficiariesList from "@sections/settings/referred-beneficiary-settings/referred-beneficiary-list";
import { IBeneficiary } from "@types/beneficiaries";

const vendorTransactions: IBeneficiary[] = [
  {
    name: "Mani Byanjankar",
    phone: "9864587899",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    transactionHash: "0x1234567890",
    voucherSymbol: "USDT",
    voucherType: "FREE_VOUCHER",
    referredBy: "Santosh Byanajankar",
    createdAt: 1708678311,
  },
  {
    name: "Sarvesh Karki",
    phone: "9851574825",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    transactionHash: "0x1234567890",
    voucherSymbol: "USDT",
    voucherType: "FREE_VOUCHER",
    referredBy: "Santosh Byanajankar",
    createdAt: 1708678311,
  },
];

const ReferredBeneficiariesListPage: React.FC = () => {
  // const { vendorTransactions } = useTransactionStore();

  return (
    <IonPage>
      <CustomHeader title="Referred Beneficiaries List" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferredBeneficiariesList data={vendorTransactions} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferredBeneficiariesListPage;
