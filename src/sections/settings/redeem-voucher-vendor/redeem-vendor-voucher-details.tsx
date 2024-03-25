import { IonButton, IonCardContent, IonLoading, IonText } from "@ionic/react";
import TransparentCard from "../../../components/cards/Transparentcard/TransparentCard";
import { Controller, useForm } from "react-hook-form";
import useCustomToast from "../../../hooks/use-custom-toast";
import useTransactionStore from "../../../store/transaction";
import TextInputField from "../../../components/input/form-text-input";
import { VOUCHER } from "../../../types/beneficiaries";
import CustomToast from "../../../components/toast";

type FormValues = {
  vouchers: number;
};

const RedeemVendorVoucherDetails: React.FC<{ voucherType: VOUCHER }> = ({
  voucherType,
}) => {
  const { transferVoucher } = useTransactionStore();
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
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
      const res = await transferVoucher({
        voucherType,
        amount: data?.vouchers,
      });
    } catch (error) {
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
        position="middle"
        color={toastColor}
      />
      <TransparentCard>
        <IonCardContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Enter the number of voucher"
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
                required: "Please enter the number of vouchers",
              }}
              control={control}
              name="vouchers"
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
            <IonButton
              mode="md"
              type="submit"
              expand="block"
              color="primary"
              disabled={isSubmitting || !isValid}
            >
              Verify
            </IonButton>
          </form>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default RedeemVendorVoucherDetails;
