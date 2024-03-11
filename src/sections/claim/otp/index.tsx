import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCardContent,
  IonLoading,
  IonRow,
  IonText,
} from "@ionic/react";
import useAppStore from "@store/app";
import { ITransactionItem } from "../../../types/transactions";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { IBeneficiary } from "../../../types/beneficiaries";

import { useState } from "react";
import useTransactionStore from "@store/transaction";

import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { BENEFICIARY_ADDRESS } from "../../../config";

type Props = {
  data: IBeneficiary;
};

const OTP = ({ data: transactionData }: Props) => {
  const { verifyOtp } = useTransactionStore();
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);
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
      // if (data?.otp != "1234") throw new Error("Invalid OTP");
      // console.log(transactionData);
      await verifyOtp(data?.otp, BENEFICIARY_ADDRESS);
      history.push("/transaction-result", { data: transactionData });
    } catch (error) {
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
      <IonLoading
        mode="md"
        isOpen={loadingVisible}
        message={"Please wait..."}
      />

      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <TransparentCard>
          <IonCardContent>
            <IonText>
              <p>OTP code from SMS (Ask OTP to the beneficiary)</p>
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

        {/* <IonRow className="restore-button-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
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
            </IonCol>
          </IonRow> */}
      </form>
    </>
  );
};

export default OTP;
