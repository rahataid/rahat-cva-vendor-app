import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCardContent,
  IonLoading,
  IonRow,
  IonText,
} from "@ionic/react";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { BENEFICIARY_VOUCHER_DETAILS } from "../../../types/beneficiaries";

import useTransactionStore from "@store/transaction";

import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import CustomToast from "@components/toast";
import useCustomToast from "@hooks/use-custom-toast";

type Props = {
  data: {
    voucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryAddress: string;
  };
};

const OTP = ({ data: { voucher, beneficiaryAddress } }: Props) => {
  const { verifyOtp } = useTransactionStore();
  const history = useHistory();
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      otp: undefined,
    },
  });

  const onSubmit = async (data: { otp: string }) => {
    try {
      const otpRes = await verifyOtp(data?.otp, beneficiaryAddress);

      history.push("/transaction-result", {
        data: { beneficiaryAddress, voucher, otpRes: otpRes.data },
      });
    } catch (error) {
      console.log(error);
      showToast("Something went wrong! Try again later.", "danger");
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
      });
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      <IonLoading mode="md" isOpen={isSubmitting} message={"Please wait..."} />
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
            <IonText>
              <p>OTP code from SMS (Ask OTP from the beneficiary)</p>
            </IonText>
            <br />
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Enter OTP"
                  type="number"
                  label="OTP*"
                  value={getValues("otp")}
                  errorText={errors?.otp?.message}
                  onInput={(e: any) => {
                    setValue("otp", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onBlur={field.onBlur}
                />
              )}
              rules={{
                required: "Please enter OTP",
              }}
              control={control}
              name="otp"
            />
            <br />
            {errors?.root?.serverError?.message && (
              <>
                <IonText color="danger">
                  {errors?.root?.serverError.message}
                </IonText>
                <br />
              </>
            )}
            <div className="button-container">
              <IonButton
                mode="md"
                type="submit"
                expand="block"
                color="primary"
                disabled={isSubmitting}
              >
                Verify
              </IonButton>
              <IonRow className="gap-5"></IonRow>
              <IonButton
                mode="md"
                color="primary"
                fill="outline"
                expand="block"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </IonButton>
            </div>
          </IonCardContent>
        </TransparentCard>
      </form>
    </>
  );
};

export default OTP;
