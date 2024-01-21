import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
  IonText,
  useIonViewWillLeave,
} from "@ionic/react";
import { useProject } from "@services/contracts/useProject";
import useAppStore from "@store/app";
import { ITransactionItem } from "../../../types/transactions";
import { ethers } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { IBeneficiary } from "../../../types/beneficiaries";
import VendorsService from "@services/vendors";
import { useState } from "react";
import useTransactionsStore from "@store/transactions";

type Props = {
  data: {
    transactionPayload: ITransactionItem;
    selectedBeneficiary: IBeneficiary;
    internetAccess: boolean;
    selectedInput: "phone" | "walletAddress";
  };
};

const OTP = ({ data }: Props) => {
  const {
    transactionPayload,
    selectedBeneficiary,
    internetAccess,
    selectedInput,
  } = data;
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const { wallet } = useAppStore();
  const { addTransaction } = useTransactionsStore();
  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });

  useIonViewWillLeave(() => {
    setLoadingVisible(false);
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoadingVisible(true);
      if (!internetAccess) {
        const otpHash = ethers.id(formData?.otp);

        if (otpHash !== selectedBeneficiary?.otpHash)
          throw new Error("OTP doesn't match");

        await addTransaction(transactionPayload);
      } else {
        const { data } = await VendorsService.processTransaction({
          vendorAddress: wallet?.address || "",
          beneficiaryAddress:
            (selectedInput === "phone" && transactionPayload?.phone) ||
            (selectedInput === "walletAddress" &&
              transactionPayload?.walletAddress) ||
            "",
          otp: formData?.otp || "",
        });
        if (!data.hash)
          throw new Error("Something went wrong with OTP Verification");
        await addTransaction({
          ...transactionPayload,
          status: "SUCCESS",
          hash: data.hash,
        });
      }
      setLoadingVisible(false);
      history.push("/tabs/home");
    } catch (error: any) {
      setLoadingVisible(false);
      setError("root.serverError", {
        type: "manual",
        message: error?.message
          ? error.message
          : "Something went wrong! Try again later.",
      });
    }
  };

  const handleCancel = () => {
    history.goBack();
  };
  return (
    <>
      <IonLoading isOpen={loadingVisible} message={"Please wait....xxx"} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <IonGrid className="restore-container">
          <IonRow className="restore-form-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <Controller
                render={({ field }) => (
                  <TextInputField
                    placeholder="Enter OTP"
                    type="text"
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
                <IonText color="danger">
                  {errors?.root?.serverError.message}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="restore-button-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <IonButton
                type="submit"
                expand="block"
                color="white"
                disabled={isSubmitting}
              >
                Submit
              </IonButton>
              <IonRow className="gap-5"></IonRow>
              <IonButton
                color="white"
                fill="outline"
                expand="block"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default OTP;
