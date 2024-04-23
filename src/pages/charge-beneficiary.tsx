import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";
import { FC } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

type Props = {
  scannerValue?: string;
  error?: boolean;
  showWalletTab?: boolean;
};
interface LocationState {
  data: Props;
}

const ChargeBeneficiaryPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title={t("CHARGE_BENEFICIARY_PAGE.PAGE_TITLE")} />
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
