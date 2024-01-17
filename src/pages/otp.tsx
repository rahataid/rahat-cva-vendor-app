import { IonContent, IonPage } from "@ionic/react";
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
};
interface LocationState {
  data: Props;
}

const OTPPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="OTP" />
      <IonContent fullscreen scrollY={false}>
        <OTP data={data} />
      </IonContent>
    </IonPage>
  );
};

export default OTPPage;
