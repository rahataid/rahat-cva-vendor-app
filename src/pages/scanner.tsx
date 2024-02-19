import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import Scanner from "@sections/plugins/scanner";
import CustomHeader from "@components/header/customHeader";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { useHistory } from "react-router";
import { useEffect } from "react";

const ScannerPage: React.FC = () => {
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
        stopScan();
        history.push("/tabs/charge-beneficiary", {
          data: {
            scannerValue: result.barcode.displayValue,
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

  useEffect(() => {
    startScan();
  }, []);

  return (
    <IonPage>
      <CustomHeader title="Scanner" showBackButton />
      <IonContent fullscreen scrollY={false}>
        <Scanner />
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
