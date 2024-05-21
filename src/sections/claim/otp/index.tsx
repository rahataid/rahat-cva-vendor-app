import TextInputField from "@components/input/form-text-input";
import { IonButton, IonCardContent, IonRow, IonText } from "@ionic/react";

import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "../../../types/beneficiaries";

import useTransactionStore from "@store/transaction";

import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import CustomToast from "@components/toast";
import useCustomToast from "@hooks/use-custom-toast";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CustomLoader from "@components/loaders/customLoader";
import { handleError } from "@utils/errorHandler";
import { UpdateStatusRes } from "@types/transactions";

type Props = {
  data: {
    beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    redeemRes: UpdateStatusRes;
  };
};

const OTP: FC<Props> = ({
  data: { beneficiaryVoucher, beneficiaryDetails, redeemRes },
}) => {
  const { t } = useTranslation();
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
      const otpRes = await verifyOtp(
        data?.otp,
        beneficiaryDetails?.walletAddress
      );

      history.push("/transaction-result", {
        data: { beneficiaryDetails, beneficiaryVoucher, redeemRes },
      });
    } catch (error) {
      console.log(error);
      showToast(handleError(error), "danger");
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
  };

  const handleCancel = () => {
    history.goBack();
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <TransparentCard>
          <IonCardContent>
            <IonText>
              <p>{t("OTP_PAGE.MSG")}</p>
            </IonText>
            <br />
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder={t("OTP_PAGE.PLACEHOLDERS.OTP")}
                  type="number"
                  label={t("OTP_PAGE.LABELS.OTP")}
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
                required: t("OTP_PAGE.ERRORS.OTP"),
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
                {t("OTP_PAGE.BUTTONS.SUBMIT")}
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
                {t("OTP_PAGE.BUTTONS.CANCEL")}
              </IonButton>
            </div>
          </IonCardContent>
        </TransparentCard>
      </form>
    </>
  );
};

export default OTP;
