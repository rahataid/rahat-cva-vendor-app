import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ReferResult from "@sections/refer-result";
import { IBeneficiary } from "@types/beneficiaries";
import { LocationState } from "history";
import { useLocation } from "react-router";

const ReferResultPage: React.FC = () => {
  // const data: IBeneficiary[] = [
  //   {
  //     name: "Mani Byanjankar",
  //     phone: "9864587899",
  //     status: "SUCCESS",
  //     beneficiaryType: "REFERRED",
  //     transactionHash: "0x1234567890",
  //     voucherSymbol: "USDT",
  //     voucherType: "FREE_VOUCHER",
  //     referredBy: "Santosh Byanajankar",
  //     createdAt: 1708678311,
  //   },
  //   {
  //     name: "Sarvesh Karki",
  //     phone: "9851574825",
  //     status: "SUCCESS",
  //     beneficiaryType: "REFERRED",
  //     transactionHash: "0x1234567890",
  //     voucherSymbol: "USDT",
  //     voucherType: "FREE_VOUCHER",
  //     referredBy: "Santosh Byanajankar",
  //     createdAt: 1708678311,
  //   },
  // ];

  interface LocationState {
    data: any;
  }
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  console.log("refer result", data);
  return (
    <IonPage>
      <CustomHeader title="Refer Details" showBackButton />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferResult data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferResultPage;
