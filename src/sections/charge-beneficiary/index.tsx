import {
  IonButton,
  IonCardContent,
  IonLabel,
  IonLoading,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { useGraphService } from "@contexts/graph-query";
import {
  isVoucherAssigned,
  isVoucherClaimed,
} from "../../utils/helperFunctions";
import CustomToast from "../../components/toast";
import useCustomToast from "../../hooks/use-custom-toast";
import { differentiateInput } from "../../utils/web3";
import BeneficiariesService from "../../services/beneficiaries";
import ChargeQr from "./charge-qr";

type Props = {
  data: {
    scannerValue?: string;
    error?: boolean;
    showWalletTab?: boolean;
  };
};

const ChargeBeneficiary = ({ data }: Props) => {
  const { queryService } = useGraphService();
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
  const [filter, setFilter] = useState(null);

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      walletAddress: data?.scannerValue || "",
      phone: undefined,
      code: undefined,
    },
  });

  const fetchBeneficiaryVoucher = async (formData: any) => {
    let benWalletAddress: string;
    if (filter === "PHONE") {
      const data = await BeneficiariesService.getByPhone(
        `${formData.code}${formData?.phone}`
      );
      if (!data?.data?.data) throw new Error("Invalid Beneficiary");
      benWalletAddress = data?.data?.data?.walletAddress;
    } else if (filter === "WALLET") {
      benWalletAddress = formData?.walletAddress;
    }
    const beneficiaryVoucher = await queryService.useBeneficiaryVoucher(
      benWalletAddress
    );
    // fix for release
    // if (isVoucherClaimed(beneficiaryVoucher))
    //   throw new Error("Beneficiary has already claimed the Voucher");
    // else if (!isVoucherAssigned(beneficiaryVoucher))
    //   throw new Error("Voucher not assigned to beneficiary");

    return {
      //  beneficiary,  get beneficiary details from walletAddress number from the backend
      beneficiaryVoucher,
      beneficiaryAddress: benWalletAddress,
    };
  };

  const onSubmit = async (data: any) => {
    setLoadingVisible(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const {
        // beneficiary,
        beneficiaryAddress,
        beneficiaryVoucher,
      } = await fetchBeneficiaryVoucher(data);
      history.push("/redeem-voucher", {
        data: {
          //  data: beneficiary,
          beneficiaryAddress,
          beneficiaryVoucher,
        },
      });
    } catch (error: any) {
      // const validErrors = [
      //   "Invalid beneficiary",
      //   "Invalid Beneficiary Address",
      //   "Not enough balance",
      //   "Please sync beneficiaries to charge in offline mode",
      // ];
      // const errorMessage = validErrors.includes(error.message)
      //   ? error.message
      //   : "Something went wrong. Try again later";
      showToast(
        error.message || "Something went wrong! Try again later.",
        "danger"
      );
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
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
      showToast("Invalid ethereum wallet address", "danger");
    }
    stopScan();
  }, []);

  return (
    <>
      <IonLoading
        mode="md"
        isOpen={loadingVisible}
        message={"Please wait..."}
      />
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={hideToast}
        message={toastMessage}
        duration={2000}
        position="middle"
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
                <IonLabel className="segment-label">Phone</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="WALLET">
                <IonLabel className="segment-label">Wallet</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            {filter === "PHONE" && (
              <ChargePhone
                getValues={getValues}
                errors={errors}
                setValue={setValue}
                control={control}
                setError={setError}
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
              Fetch Beneficiary Voucher
            </IonButton>
          </IonCardContent>
        </TransparentCard>

        {/* <IonRow className="charge-button-container">
            <IonCol
              size="11"
              sizeMd="11"
              sizeLg="11"
              sizeXl="11"
              className="charge-button-wrapper"
            >
              {!isPlatformWeb && (
                <IonButton
                  mode="md"
                  color="dark"
                  fill="outline"
                  onClick={handleToggle}
                  disabled={isSubmitting}
                >
                  "Scan"
                </IonButton>
              )}

              <IonButton
                mode="md"
                type="submit"
                expand="block"
                color="dark"
                disabled={!isValid || isSubmitting}
              >
                Fetch Beneficiary Voucher
              </IonButton>
            </IonCol>
          </IonRow> */}
      </form>
    </>
  );
};

export default ChargeBeneficiary;
