import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import OTP from "@sections/claim/otp";
import "../theme/title.css";
import { useLocation } from "react-router-dom";
import { IBeneficiary } from "../types/beneficiaries";
import { ITransactionItem } from "../types/transactions";
import CustomHeader from "@components/header/customHeader";

type Props = {
  transactionPayload: ITransactionItem;
  selectedBeneficiary: IBeneficiary;
  internetAccess: boolean;
  selectedInput: "phone" | "walletAddress";
};
interface LocationState {
  data: Props;
}

const OTPPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="OTP" showBackButton />
      <IonContent fullscreen scrollY={false}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <OTP data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OTPPage;
