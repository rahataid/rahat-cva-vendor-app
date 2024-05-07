import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonCardContent,
  IonCol,
  IonIcon,
  IonText,
} from "@ionic/react";
import { useFieldArray, useForm } from "react-hook-form";
import ReferSection from "./refer-section";
import { add } from "ionicons/icons";
import { useHistory } from "react-router";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_BENEFICIARY_DETAILS,
} from "@types/beneficiaries";
import useTransactionStore from "@store/transaction";
import CustomToast from "../../components/toast";
import useCustomToast from "../../hooks/use-custom-toast";
import { useTranslation } from "react-i18next";
import CardComponent from "@sections/home/home-card";
import { useMemo } from "react";
import { handleError } from "@utils/errorHandler";
import CustomLoader from "@components/loaders/customLoader";
import { MAX_REFERALS } from "@constants/values";

type Props = {
  data: {
    beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    from: string;
  };
};

const ReferBeneficiaries = ({
  data: { beneficiaryVoucher, from, beneficiaryDetails },
}: Props) => {
  const { t } = useTranslation();
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();

  const { referBeneficiaries } = useTransactionStore();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, isDirty, isLoading, errors, isSubmitting },
    getValues,
    setValue,
    setError,
    trigger,
  } = useForm({
    mode: "all",
    defaultValues: {
      beneficiaries: [
        {
          name: "",
          phone: "",
          gender: "",
          estimatedAge: null,
          address: "",
          code: "",
          iso: "",
          fullPhone: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiaries",
    max: 3,
  });

  const isMaxReferralsReached = useMemo(() => {
    return (
      fields?.length >=
        MAX_REFERALS - beneficiaryDetails?.beneficiariesReferred ||
      fields.length >= 3
    );
  }, [fields, beneficiaryDetails]);

  const totalAvailableReferrals = useMemo(() => {
    return MAX_REFERALS - beneficiaryDetails?.beneficiariesReferred;
  }, [beneficiaryDetails]);

  const onSubmit = async (data: any) => {
    try {
      const { beneficiaries } = data;
      const referredBeneficiaries = beneficiaries.map(
        (el: REFER_BENEFICIARY_DETAILS) => {
          return {
            ...el,
            phone: `${el?.fullPhone}`,
          };
        }
      );

      const response = await referBeneficiaries({
        referredBeneficiaries,
        beneficiaryVoucher,
        beneficiaryAddress: beneficiaryDetails?.walletAddress,
        beneficiaryDetails,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
      history.push("/refer-result", {
        data: { data: response, from, beneficiaryVoucher },
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

  const handleRemove = (index: number) => {
    if (index > 0) remove(index);
  };

  const handleDisabledAddMore = (condition: boolean) => {
    if (condition) showToast(t("GLOBAL.ERRORS.RESTRICT_REFER"), "danger");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={hideToast}
        message={toastMessage}
        duration={2000}
        position="top"
        color={toastColor}
      />
      <CustomLoader isOpen={isSubmitting} />
      <CardComponent
        subtitle={t("REFER_BENEFICIARIES_PAGE.TOTAL_AVAILABLE_REFERRALS")}
        title={totalAvailableReferrals || 0}
        loading={false}
      />
      <TransparentCard>
        <IonCardContent>
          {fields.map((field, index) => (
            <div key={field.id}>
              <ReferSection
                index={index}
                getValues={getValues}
                setValue={setValue}
                control={control}
                formState={{ isSubmitted, errors }}
                handleRemove={() => handleRemove(index)}
                remove={remove}
                setError={setError}
                trigger={trigger}
              />
            </div>
          ))}
          <div
            onClick={() => handleDisabledAddMore(isMaxReferralsReached)}
            className="button-full-width"
          >
            <IonButton
              fill="outline"
              color="primary"
              onClick={() =>
                append({
                  name: "",
                  phone: "",
                  gender: "",
                  estimatedAge: null,
                  address: "",
                  code: "",
                  iso: "",
                  fullPhone: "",
                })
              }
              disabled={isMaxReferralsReached}
            >
              <IonIcon icon={add} />
              {t("REFER_BENEFICIARIES_PAGE.BUTTONS.ADD_MORE")}
            </IonButton>
          </div>
          <br />
          <br />

          <IonCol size="12" className="px-0">
            {errors?.beneficiaries?.length && isSubmitted && (
              <IonText color="danger">
                {t("REFER_BENEFICIARIES_PAGE.ERRORS.INVALID_FORM")}
              </IonText>
            )}
            {errors?.root?.serverError?.message && (
              <IonText color="danger">
                {errors?.root?.serverError.message}
              </IonText>
            )}
          </IonCol>

          <IonButton
            expand="block"
            type="submit"
            disabled={isLoading || isSubmitting || totalAvailableReferrals <= 0}
          >
            {t("REFER_BENEFICIARIES_PAGE.BUTTONS.SUBMIT")}
          </IonButton>
        </IonCardContent>
      </TransparentCard>
    </form>
  );
};

export default ReferBeneficiaries;
