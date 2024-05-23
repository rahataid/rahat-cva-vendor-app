import {
  IonButton,
  IonCardContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  isPlatform,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

import CustomToast from "../../components/toast";
import useCustomToast from "../../hooks/use-custom-toast";
import BeneficiariesService from "../../services/beneficiaries";
import ChargeQr from "./charge-qr";
import useTransactionStore from "@store/transaction";
import { isVoucherAssigned } from "@utils/helperFunctions";
import { useTranslation } from "react-i18next";
import CustomLoader from "@components/loaders/customLoader";
import { handleError } from "@utils/errorHandler";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";

type Props = {
  data: {
    scannerValue?: string;
    error?: boolean;
    showWalletTab?: boolean;
  };
};

const ChargeBeneficiary = ({ data }: Props) => {
  const { t } = useTranslation();
  const { fetchBeneficiaryVoucherDetails } = useTransactionStore();
  const { getBeneficiaryReferredDetailsByUuid } = useTransactionStore();
  const isPlatformWeb = isPlatform("mobileweb") || isPlatform("desktop");
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
  const [filter, setFilter] = useState("PHONE");

  const {
    trigger,
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      walletAddress: data?.scannerValue || "",
      phone: undefined,
      code: undefined,
      fullPhone: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    setLoadingVisible(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      history.push("/otp", {});
    } catch (error: any) {
      console.log(error);

      showToast(handleError(error), "danger");
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
    setLoadingVisible(false);
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
    if (data?.showWalletTab) setFilter("WALLET");
    else setFilter("PHONE");
    if (data?.error) {
      showToast(`${t("GLOBAL.ERRORS.INVALID_ETHEREUM_ADDRESS")}`, "danger");
    }
    if (!isPlatformWeb) stopScan();
  }, []);

  return (
    <>
      <CustomLoader isOpen={loadingVisible} />
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={hideToast}
        message={toastMessage}
        duration={2000}
        color={toastColor}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <TransparentCard>
          <IonCardContent>
            <IonSegment
              swipeGesture={true}
              value={filter}
              mode="md"
              onIonChange={(e: any) => {
                setFilter(e.detail.value);
              }}
            >
              <IonSegmentButton value="PHONE">
                <IonLabel className="segment-label">
                  {t("CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.TITLE")}
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="WALLET">
                <IonLabel className="segment-label">
                  {t("CHARGE_BENEFICIARY_PAGE.SEGMENTS.WALLET.TITLE")}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
            {filter === "PHONE" && (
              <ChargePhone
                getValues={getValues}
                errors={errors}
                setValue={setValue}
                control={control}
                setError={setError}
                watch={watch}
                trigger={trigger}
              />
            )}
            {filter === "WALLET" && (
              <ChargeQr
                getValues={getValues}
                errors={errors}
                setValue={setValue}
                control={control}
                setError={setError}
              />
            )}
            <IonButton
              mode="md"
              type="submit"
              expand="block"
              color="primary"
              disabled={!isValid || isSubmitting}
            >
              {t("CHARGE_BENEFICIARY_PAGE.SEGMENTS.BUTTONS.SUBMIT")}
            </IonButton>
          </IonCardContent>
        </TransparentCard>
      </form>
    </>
  );
};

export default ChargeBeneficiary;
