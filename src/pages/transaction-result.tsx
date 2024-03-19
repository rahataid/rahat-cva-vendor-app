import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import TransactionResult from "@sections/transaction-result";
import { BENEFICIARY_VOUCHER_DETAILS } from "@types/beneficiaries";
import { useLocation } from "react-router";
import { MetaTxResponse } from "@types/transactions";

interface LocationState {
  data: {
    voucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryAddress: string;
    otpRes: MetaTxResponse;
  };
}

const TransactionResultPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };

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
