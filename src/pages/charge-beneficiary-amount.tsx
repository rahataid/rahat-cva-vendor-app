import CustomHeader from "@components/header/customHeader";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  isPlatform,
} from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";
import { FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { scan } from "ionicons/icons";
import FloatingButton from "@components/buttons/floating-button";
import { BENEFICIARY_DETAILS } from "@types/beneficiaries";
import ChargeBeneficiaryAmount from "@sections/charge-beneficiary-amount";

type Props = {
  beneficiaryDetails?: BENEFICIARY_DETAILS;
  beneficiaryBalance?: number;
};
interface LocationState {
  data: Props;
}

const ChargeBeneficiaryAmountPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  const isPlatformWeb = isPlatform("mobileweb") || isPlatform("desktop");

  const toggleWrapper = (data: boolean) => {
    const wrapper = document.getElementById("wrapper");
    if (!wrapper) return;
    if (data) {
      wrapper.style.display = "block";
    } else wrapper.style.display = "none";
  };

  const stopScan = async () => {
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    toggleWrapper(false);
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  };

  useEffect(() => {
    if (!isPlatformWeb) stopScan();
  }, []);

  return (
    <IonPage>
      <CustomHeader
        showBackButton={true}
        title={t("CHARGE_BENEFICIARY_AMOUNT_PAGE.PAGE_TITLE")}
      />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ChargeBeneficiaryAmount
                beneficiaryBalance={data?.beneficiaryBalance}
                beneficiaryDetails={data?.beneficiaryDetails}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryAmountPage;
