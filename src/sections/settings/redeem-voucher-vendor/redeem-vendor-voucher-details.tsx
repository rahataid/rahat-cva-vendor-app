import { IonButton, IonCardContent, IonLoading, IonText } from "@ionic/react";
import TransparentCard from "../../../components/cards/Transparentcard/TransparentCard";
import { Controller, useForm } from "react-hook-form";
import useCustomToast from "../../../hooks/use-custom-toast";
import useTransactionStore from "../../../store/transaction";
import TextInputField from "../../../components/input/form-text-input";
import { VOUCHER } from "../../../types/beneficiaries";
import CustomToast from "../../../components/toast";
import { useState } from "react";
import { useVendorVoucherRedemptionCount } from "../../../api/vendors";
import CardComponent from "@sections/home/home-card";

type FormValues = {
  vouchers: number;
};

const RedeemVendorVoucherDetails: React.FC<{ voucherType: VOUCHER }> = ({
  voucherType,
}) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { transferVoucher } = useTransactionStore();
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
  const { data, isRefetching } = useVendorVoucherRedemptionCount(voucherType);
  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      vouchers: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await transferVoucher({
        voucherType,
        amount: data?.vouchers,
      });
      setSubmitSuccess(true);
      showToast("Voucher redeemed successfully", "success");
    } catch (error) {
      console.log(error);
      setSubmitSuccess(false);
      showToast("Something went wrong! Try again later.", "danger");
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
      });
    }
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
      <CardComponent
        subtitle="Total Available Vouchers For Redemption"
        title={data}
        loading={isRefetching}
      />
      <TransparentCard>
        <IonCardContent>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Enter the number of vouchers to redeem"
                  type="number"
                  label="Number of vouchers*"
                  value={getValues("vouchers")}
                  errorText={errors?.vouchers?.message}
                  onInput={(e: any) => {
                    setValue("vouchers", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onBlur={field.onBlur}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the number of vouchers",
                },
                validate: {
                  notZero: (value) =>
                    Number(value) !== 0 || "Value cannot be zero",
                  positiveInteger: (value) =>
                    (Number.isInteger(Number(value)) && Number(value) > 0) ||
                    "Value must be a positive integer",
                  lessThanOrEqualToData: (value) =>
                    Number(value) <= data ||
                    "You can't redeem more than available vouchers",
                },
              }}
              control={control}
              name="vouchers"
            />
            <br />
            {submitSuccess && (
              <IonText color="success">Voucher redeemed successfully</IonText>
            )}
            {errors?.root?.serverError?.message && (
              <>
                <IonText color="danger">
                  {errors?.root?.serverError.message}
                </IonText>
                <br />
              </>
            )}
            <IonButton
              mode="md"
              type="submit"
              expand="block"
              color="primary"
              disabled={isSubmitting || !isValid}
            >
              Submit
            </IonButton>
          </form>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default RedeemVendorVoucherDetails;
