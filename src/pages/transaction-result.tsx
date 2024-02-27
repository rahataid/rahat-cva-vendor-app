import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import { TransactionDetail } from "@types/transactions";
import TransactionResult from "@sections/transaction-result";

const TransactionResultPage: React.FC = () => {
  const data: TransactionDetail = {
    beneficiaryName: "Pranu Manandhar",
    voucherType: "FREE_VOUCHER",
    beneficiaryType: "ENROLLED",
    transactionHash: "0x1234567890",
    voucherSymbol: "USDT",
    phone: "9865254816",
    createdAt: 1677390536,
    status: "SUCCESS",
  };
  return (
    <IonPage>
      <CustomHeader title="Transaction Result" showBackButton />
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
