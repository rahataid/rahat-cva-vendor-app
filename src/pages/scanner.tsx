import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import Scanner from "@sections/plugins/scanner";
import CustomHeader from "@components/header/customHeader";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { useHistory, useLocation } from "react-router";
import { FC, useEffect, useState } from "react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import {
  extractWalletAddressOnScan,
  isValidEthereumAddressOnScan,
  isVoucherAssigned,
} from "../utils/helperFunctions";
import { useTranslation } from "react-i18next";
import BeneficiariesService from "@services/beneficiaries";
import useTransactionStore from "@store/transaction";
import CustomLoader from "@components/loaders/customLoader";
import "../sections/plugins/scanner/scanner.scss";
import CustomToast from "@components/toast";
import useCustomToast from "@hooks/use-custom-toast";
import { handleError } from "@utils/errorHandler";

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
  const [isLoading, setIsLoading] = useState(false);
  const { getBeneficiaryDetailsByWallet } = useTransactionStore();
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();

  const fetchBeneficiaryDetails = async (walletAddress: string) => {
    let beneficiaryDetails = await getBeneficiaryDetailsByWallet(walletAddress);
    if (!beneficiaryDetails?.data?.data) throw new Error("Invalid Beneficiary");
    beneficiaryDetails = beneficiaryDetails?.data?.data;

    const beneficiaryBalance = await getBeneficiaryClaims(
      beneficiaryDetails?.walletAddress
    );

    return {
      beneficiaryDetails,
      beneficiaryBalance,
    };
  };

  const barcodeScanned = async (result: any) => {
    try {
      await BarcodeScanner.stopScan();
      setIsLoading(true);
      await hapticsImpactHeavy();
      if (!isValidEthereumAddressOnScan(result?.barcode?.displayValue))
        throw new Error("Invalid ethereum wallet address");
      const { beneficiaryDetails, beneficiaryBalance } =
        await fetchBeneficiaryDetails(
          extractWalletAddressOnScan(result.barcode.displayValue)
        );
      await deinitializeScanner();
      setIsLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 0));
      history.push("/charge-beneficiary-amount", {
        data: {
          beneficiaryDetails,
          beneficiaryBalance,
        },
      });
    } catch (error) {
      await BarcodeScanner.startScan();
      setIsLoading(false);
      console.error("Error fetching beneficiary voucher:", error);
      showToast(handleError(error), "danger");
    }
  };

  const deinitializeScanner = async () => {
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    toggleWrapper(false);
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  };

  const initializeScanner = async () => {
    document.querySelector("body")?.classList.add("barcode-scanner-active");
    toggleWrapper(true);
    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      barcodeScanned
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
    initializeScanner();
  }, []);

  return (
    <IonPage>
      <CustomHeader title={t("SCANNER_PAGE.PAGE_TITLE")} showBackButton />
      <IonContent fullscreen scrollY={false}>
        <CustomToast
          isOpen={toastVisible}
          onDidDismiss={hideToast}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          className="scanner-visible-component"
        />
        <CustomLoader
          isOpen={isLoading}
          className="scanner-visible-component"
        />
        <Scanner toggleTorch={toggleTorch} setZoomRatio={setZoomRatio} />
      </IonContent>
    </IonPage>
  );
};

export default ScannerPage;
