import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ReferSuccess from "@sections/refer-success";
import { IBeneficiary } from "@types/beneficiaries";

const ReferSuccessPage: React.FC = () => {
  const data: IBeneficiary[] = [
    {
      name: "Mani Byanjankar",
      phone: "9864587899",
      status: "SUCCESS",
      beneficiaryType: "ENROLLED",
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
  return (
    <IonPage>
      <CustomHeader title="Refer Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferSuccess data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferSuccessPage;
