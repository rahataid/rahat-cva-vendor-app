import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import { TransactionDetail } from "@types/transactions";
import TransactionResult from "@sections/transaction-result";
import { IBeneficiary } from "@types/beneficiaries";
import { useLocation } from "react-router";

interface LocationState {
  data: IBeneficiary;
}

const TransactionResultPage: React.FC = () => {
  // const data: TransactionDetail = {
  //   beneficiaryName: "Mani Byanjankar",
  //   voucherType: "FREE_VOUCHER",
  //   beneficiaryType: "ENROLLED",
  //   transactionHash: "0x1234567890",
  //   voucherSymbol: "USDT",
  //   phone: "9864587899",
  //   createdAt: 1632960000000,
  //   status: "SUCCESS",
  // };
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  console.log(data);
  return (
    <IonPage>
      <CustomHeader title="Transaction Result" />
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
