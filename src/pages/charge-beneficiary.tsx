import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";
import { useLocation } from "react-router";

type Props = {
  scannerValue: string;
};
interface LocationState {
  data: Props;
}

const ChargeBeneficiaryPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Charge Beneficiary" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ChargeBeneficiary data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryPage;
