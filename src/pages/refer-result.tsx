import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ReferResult from "@sections/refer-result";
import { useLocation } from "react-router";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_RESULT_BENEFICIARY_DETAILS,
} from "../types/beneficiaries";

const ReferResultPage: React.FC = () => {
  type LocationState = {
    data: {
      data: REFER_RESULT_BENEFICIARY_DETAILS[];
      from: "redeemVoucher" | "transactionResult";
      voucher: BENEFICIARY_VOUCHER_DETAILS;
    };
  };
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };

  console.log("refer result", data);
  return (
    <IonPage>
      <CustomHeader title="Refer Details" />
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
