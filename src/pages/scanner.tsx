import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import Scanner from "@sections/plugins/scanner";
import CustomHeader from "@components/header/customHeader";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { useHistory, useLocation } from "react-router";
import { FC, useEffect } from "react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import {
  extractWalletAddressOnScan,
  isValidEthereumAddressOnScan,
} from "../utils/helperFunctions";
import { useTranslation } from "react-i18next";

type LocationState = {
  data: {
    redirectTo: string;
  };
};

const ScannerPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const {
    data: { redirectTo },
  } = location.state || { data: null };
  const history = useHistory();

  const stopScan = async () => {
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    toggleWrapper(false);

    await BarcodeScanner.removeAllListeners();

    await BarcodeScanner.stopScan();
  };

  const startScan = async () => {
    document.querySelector("body")?.classList.add("barcode-scanner-active");
    toggleWrapper(true);

    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        if (!isValidEthereumAddressOnScan(result?.barcode?.displayValue)) {
          await hapticsImpactHeavy();
          stopScan();
          history.push(redirectTo, {
            data: {
              error: true,
              showWalletTab: true,
            },
          });
        }
        await hapticsImpactHeavy();
        stopScan();
        history.push(redirectTo, {
          data: {
            scannerValue: extractWalletAddressOnScan(
              result.barcode.displayValue
            ),
            showWalletTab: true,
          },
        });
      }
    );

    await BarcodeScanner.startScan();
  };

  const getWrapperPoints = () => {
    const wrapper = document.getElementById("wrapper");
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      return [rect.top, rect.right, rect.bottom, rect.left];
    }
  };

  const toggleWrapper = (data: boolean) => {
    const wrapper = document.getElementById("wrapper");
    if (!wrapper) return;
    if (data) {
      wrapper.style.display = "block";
    } else wrapper.style.display = "none";
  };

  const toggleTorch = async () => {
    await BarcodeScanner.toggleTorch();
  };

  const setZoomRatio = async (value: string) => {
    BarcodeScanner.setZoomRatio({
      zoomRatio: parseInt(value, 10),
    });
  };

  const hapticsImpactHeavy = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  useEffect(() => {
    startScan();
  }, []);

  return (
    <IonPage>
      <CustomHeader title={t("SCANNER_PAGE.PAGE_TITLE")} showBackButton />
      <IonContent fullscreen scrollY={false}>
        <Scanner toggleTorch={toggleTorch} setZoomRatio={setZoomRatio} />
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
