import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage, isPlatform } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "@types/beneficiaries";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { FC, useEffect } from "react";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";

type Props = {
  beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
  beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
};
interface LocationState {
  data: Props | null;
}

const RedeemVoucherPage: FC = () => {
  const location = useLocation<LocationState>();
  const {
    data: { beneficiaryDetails, beneficiaryVoucher },
  } = location.state || { data: null };
  const { t } = useTranslation();
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
        title={t("REDEEM_VOUCHER_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <RedeemVoucher
          beneficiaryDetails={beneficiaryDetails}
          beneficiaryVoucher={beneficiaryVoucher}
        />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
