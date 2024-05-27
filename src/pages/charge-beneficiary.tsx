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

type Props = {
  scannerValue?: string;
  error?: boolean;
  showWalletTab?: boolean;
};
interface LocationState {
  data: Props;
}

const ChargeBeneficiaryPage: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  const isPlatformWeb = isPlatform("mobileweb") || isPlatform("desktop");

  const handleScanClick = () => {
    history.push("/scanner", {
      data: { redirectTo: "/tabs/charge-beneficiary" },
    });
  };

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
      <CustomHeader title={t("CHARGE_BENEFICIARY_PAGE.PAGE_TITLE")} />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ChargeBeneficiary data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
        {!isPlatformWeb && (
          <>
            <FloatingButton
              slot="fixed"
              vertical="bottom"
              horizontal="end"
              edge={true}
              icon={scan}
              onClick={handleScanClick}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChargeBeneficiaryPage;
