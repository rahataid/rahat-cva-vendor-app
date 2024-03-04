import React from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import TransactionsList from "@sections/settings/transactions-settings/transactions-list";
import CustomHeader from "@components/header/customHeader";
import useTransactionStore from "@store/transaction";
import { ITransactionItem } from "@types/transactions";
import { sortBeneficiariesByDate } from "@utils/helperFunctions";
import useAppStore from "@store/app";

const TransactionsListPage: React.FC = () => {
  // const { vendorTransactions } = useTransactionStore();
  // const data: ITransactionItem[] = [
  //   {
  //     projectName: "CVA Project",
  //     createdAt: 1632960000000,
  //     type: "ENROLLED",
  //   },
  // ];
  const { mockData } = useAppStore();
  const data = sortBeneficiariesByDate(mockData);
  return (
    <IonPage>
      <CustomHeader title="Transactions List" />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionsList data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsListPage;
