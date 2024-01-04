import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OTP from "@sections/claim/otp";
import "../theme/title.css";
import { useLocation } from "react-router-dom";
import { IBeneficiary } from "../types/beneficiaries";
import { ITransactionItem } from "../types/transactions";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">OTP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">OTP</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OTP data={data} />
      </IonContent>
    </IonPage>
  );
};

export default OTPPage;
