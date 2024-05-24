import TextInputField from "@components/input/form-text-input";
import { IonButton, IonCardContent, IonText } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BENEFICIARY_DETAILS } from "@types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { FC } from "react";
import CardComponent from "@sections/home/home-card";
import useTransactionStore from "@store/transaction";
import { useHistory } from "react-router";
import CustomLoader from "@components/loaders/customLoader";
import CustomToast from "@components/toast";
import useCustomToast from "@hooks/use-custom-toast";
import { ethers } from "ethers";

type Props = {
  beneficiaryDetails?: BENEFICIARY_DETAILS;
  beneficiaryBalance: number;
};

const ChargeBeneficiaryAmount: FC<Props> = ({
  beneficiaryDetails,
  beneficiaryBalance,
}) => {
  const history = useHistory();
  const { chargeBeneficiary } = useTransactionStore();
  const { t } = useTranslation();

  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();

  const {
    trigger,
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      amount: "",
    },
  });
  const onSubmit = async (data) => {
    const transactionRes = await chargeBeneficiary(
      beneficiaryDetails?.walletAddress,
      data?.amount
    );
    console.log("transactionRes", transactionRes);
    console.log(data, beneficiaryBalance, beneficiaryDetails);

    history.push("/otp", {
      data: { beneficiaryDetails, amount: data?.amount, transactionRes },
    });
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
        <CardComponent
          title={beneficiaryBalance || "0"}
          subtitle={t("CHARGE_BENEFICIARY_AMOUNT_PAGE.CARD_TITLE")}
          loading={false}
        />
        <TransparentCard>
          <IonCardContent>
            <Controller
              control={control}
              name="amount"
              rules={{
                required: t(
                  "CHARGE_BENEFICIARY_AMOUNT_PAGE.ERRORS.AMOUNT.REQUIRED"
                ),
                validate: {
                  validateLegitClaim: (value) => {
                    if (Number(getValues("amount")) > beneficiaryBalance)
                      return `${t(
                        "CHARGE_BENEFICIARY_AMOUNT_PAGE.ERRORS.AMOUNT.MAX"
                      )}`;
                  },
                  validatePositiveInteger: (value) => {
                    if (Number(getValues("amount")) < 0)
                      return `${t(
                        "CHARGE_BENEFICIARY_AMOUNT_PAGE.ERRORS.AMOUNT.POSITIVE_INTEGER"
                      )}`;
                  },
                  validateNonZero: (value) => {
                    if (Number(getValues("amount")) == 0)
                      return `${t(
                        "CHARGE_BENEFICIARY_AMOUNT_PAGE.ERRORS.AMOUNT.NON_ZERO"
                      )}`;
                  },
                },
              }}
              render={(field) => (
                <TextInputField
                  placeholder={t(
                    "CHARGE_BENEFICIARY_AMOUNT_PAGE.PLACEHOLDERS.AMOUNT"
                  )}
                  type="number"
                  label={t("CHARGE_BENEFICIARY_AMOUNT_PAGE.LABELS.AMOUNT")}
                  value={getValues("amount")}
                  errorText={errors?.amount?.message}
                  onInput={(e: any) => {
                    setValue("amount", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onBlur={field.onBlur}
                />
              )}
            />
            <br />
            {errors?.root?.serverError?.message && (
              <IonText color="danger">
                {errors?.root?.serverError.message}
              </IonText>
            )}
            <IonButton
              mode="md"
              type="submit"
              expand="block"
              color="primary"
              disabled={!isValid || isSubmitting}
            >
              {t("CHARGE_BENEFICIARY_AMOUNT_PAGE.BUTTONS.SUBMIT")}
            </IonButton>
          </IonCardContent>
        </TransparentCard>
      </form>
    </>
  );
};

export default ChargeBeneficiaryAmount;
