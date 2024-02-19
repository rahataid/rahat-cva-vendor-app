import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import Scanner from "@sections/plugins/scanner";
import CustomHeader from "@components/header/customHeader";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { useHistory } from "react-router";
import useAppStore from "@store/app";

const ScannerPage: React.FC = () => {
  const history = useHistory();
  const stopScan = async () => {
    // Make all elements in the WebView visible again
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    toggleWrapper(false);

    // Remove all listeners
    await BarcodeScanner.removeAllListeners();

    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  };

  const startScan = async () => {
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
    document.querySelector("body")?.classList.add("barcode-scanner-active");
    toggleWrapper(true);

    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        console.log("RESULT SCAN:", result.barcode);
        stopScan();
        history.push("/tabs/charge-beneficiary", {
          data: {
            scannerValue: result.barcode.displayValue,
          },
        });
      }
    );

    // Start the barcode scanner
    await BarcodeScanner.startScan();
  };

  const getWrapperPoints = () => {
    const wrapper = document.getElementById("wrapper");
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
      return [rect.top, rect.right, rect.bottom, rect.left];
    }
  };

  const toggleWrapper = (data: boolean) => {
    const wrapper = document.getElementById("wrapper");
    console.log("WRAPPER ELEMENT");
    if (!wrapper) return;
    if (data) {
      wrapper.style.display = "block";
    } else wrapper.style.display = "none";
  };

  const props = {
    startScan,
    stopScan,
    toggleWrapper,
    getWrapperPoints,
  };

  return (
    <IonPage>
      <CustomHeader
        title="Scanner"
        showBackButton
        onBackButtonClick={stopScan}
      />
      <IonContent fullscreen scrollY={false}>
        <Scanner {...props} />
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
