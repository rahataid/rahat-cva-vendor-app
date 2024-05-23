import { FC } from "react";
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import CustomHeader from "@components/header/customHeader";
import TransactionDetails from "@sections/transactions/transactions-details";
import { useParams } from "react-router";
import { useVendorTransactionDetails } from "@api/vendors";
import useAppStore from "@store/app";
import { useTranslation } from "react-i18next";

const TransactionsDetailPage: FC = () => {
  const { t } = useTranslation();
  const { txHash } = useParams<{ txHash: string }>();
  const voucherAddresses = useAppStore((state) => ({
    freeVoucherAddress: state?.projectSettings?.contracts?.eyevoucher?.address,
    discountVoucherAddress:
      state?.projectSettings?.contracts?.referralvoucher?.address,
  }));
  const { data } = useVendorTransactionDetails(txHash);

  return (
    <IonPage>
      <CustomHeader
        title={t("TRANSACTION_DETAILS_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <TransactionDetails
                data={data}
                voucherAddresses={voucherAddresses}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsDetailPage;
