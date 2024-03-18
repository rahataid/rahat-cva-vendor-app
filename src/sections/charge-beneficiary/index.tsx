import { IonButton, IonCardContent, IonLoading } from "@ionic/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";

import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { useGraphService } from "@contexts/graph-query";
import { BENEFICIARY_ADDRESS } from "../../config";

const ChargeBeneficiary = ({ data }: any) => {
  const { queryService } = useGraphService();
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);

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
      phone: "",
    },
  });

  const fetchBeneficiaryVoucher = async (data: any) => {
    console.log("SUBMIT BENEFICIARY VOUCHER", data);

    const beneficiaryVoucher = await queryService.useBeneficiaryVoucher(
      BENEFICIARY_ADDRESS
    );
    if (
      beneficiaryVoucher?.FreeVoucherClaimStatus === true ||
      beneficiaryVoucher?.ReferredVoucherClaimStatus === true
    )
      throw new Error("Beneficiary has already claimed the Voucher");
    else if (
      !beneficiaryVoucher?.FreeVoucherAddress &&
      !beneficiaryVoucher?.ReferredVoucherAddress
    )
      throw new Error("Voucher not assigned to beneficiary");

    return {
      //  beneficiary,  get beneficiary details from phone number from the backend
      beneficiaryVoucher,
    };
  };

  const onSubmit = async (data: any) => {
    setLoadingVisible(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const {
        // beneficiary,
        beneficiaryVoucher,
      } = await fetchBeneficiaryVoucher(data);
      history.push("/redeem-voucher", {
        data: {
          //  data: beneficiary,
          voucher: beneficiaryVoucher,
        },
      });
    } catch (error: any) {
      console.log(error);

      // const validErrors = [
      //   "Invalid beneficiary",
      //   "Invalid Beneficiary Address",
      //   "Not enough balance",
      //   "Please sync beneficiaries to charge in offline mode",
      // ];
      // const errorMessage = validErrors.includes(error.message)
      //   ? error.message
      //   : "Something went wrong. Try again later";

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
