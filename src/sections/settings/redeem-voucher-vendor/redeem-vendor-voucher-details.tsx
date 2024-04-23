import { IonButton, IonCardContent, IonText } from "@ionic/react";
import TransparentCard from "../../../components/cards/Transparentcard/TransparentCard";
import { Controller, useForm } from "react-hook-form";
import useCustomToast from "../../../hooks/use-custom-toast";
import useTransactionStore from "../../../store/transaction";
import TextInputField from "../../../components/input/form-text-input";
import { VOUCHER } from "../../../types/beneficiaries";
import CustomToast from "../../../components/toast";
import { FC, useState } from "react";
import { useVendorVoucherRedemptionCount } from "../../../api/vendors";
import CardComponent from "@sections/home/home-card";
import { useTranslation } from "react-i18next";
import CustomLoader from "@components/loaders/customLoader";
import { handleError } from "@utils/errorHandler";

type FormValues = {
  vouchers: number;
};

type Props = {
  voucherType: VOUCHER;
};

const RedeemVendorVoucherDetails: FC<Props> = ({ voucherType }) => {
  const { t } = useTranslation();
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
      showToast(t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.SUCCESS_MSG"), "success");
    } catch (error) {
      console.log(error);
      setSubmitSuccess(false);
      showToast(handleError(error), "danger");
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
  };
  return (
    <>
      <CustomLoader isOpen={isSubmitting} />
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={hideToast}
        message={toastMessage}
        duration={2000}
        color={toastColor}
      />
      <CardComponent
        subtitle={t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.CARD_TITLE")}
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
                  placeholder={t(
                    "REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.PLACEHOLDERS.VOUCHER"
                  )}
                  type="number"
                  label={t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.LABELS.VOUCHER")}
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
                  message: t(
                    "REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.ERRORS.VOUCHER.MAIN"
                  ),
                },
                validate: {
                  notZero: (value) =>
                    Number(value) !== 0 ||
                    t(
                      "REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.ERRORS.VOUCHER.NON_ZERO"
                    ),
                  positiveInteger: (value) =>
                    (Number.isInteger(Number(value)) && Number(value) > 0) ||
                    t(
                      "REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.ERRORS.VOUCHER.POSITIVE_INTEGER"
                    ),
                  lessThanOrEqualToData: (value) =>
                    Number(value) <= data ||
                    t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.ERRORS.VOUCHER.MAX"),
                },
              }}
              control={control}
              name="vouchers"
            />
            <br />
            {submitSuccess && (
              <IonText color="success">
                {t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.SUCCESS")}
              </IonText>
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
              {t("REDEEM_VENDOR_VOUCHER_DETAILS_PAGE.BUTTONS.SUBMIT")}
            </IonButton>
          </form>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default RedeemVendorVoucherDetails;
