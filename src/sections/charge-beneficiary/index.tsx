import { IonButton, IonCardContent, IonLoading } from "@ionic/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";

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

const ChargeBeneficiary = ({ data }: any) => {
  const { queryService } = useGraphService();
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();

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
      walletAddress: "",
    },
  });

  const fetchBeneficiaryVoucher = async (data: any) => {
    const formData = data?.walletAddress;
    let benWalletAddress: string;
    const inputType = differentiateInput(data?.walletAddress);
    if (inputType === "PHONE") {
      const data = await BeneficiariesService.getByPhone(formData);
      if (!data?.data?.data) throw new Error("Invalid Beneficiary");
      benWalletAddress = data?.data?.data?.walletAddress;
    } else if (inputType === "WALLET") {
      benWalletAddress = data?.walletAddress;
    }
    const beneficiaryVoucher = await queryService.useBeneficiaryVoucher(
      benWalletAddress
    );
    if (isVoucherClaimed(beneficiaryVoucher))
      throw new Error("Beneficiary has already claimed the Voucher");
    else if (!isVoucherAssigned(beneficiaryVoucher))
      throw new Error("Voucher not assigned to beneficiary");

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
            <ChargePhone
              getValues={getValues}
              errors={errors}
              setValue={setValue}
              control={control}
            />
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
