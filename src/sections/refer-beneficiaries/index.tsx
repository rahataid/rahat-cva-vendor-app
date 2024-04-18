import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonCardContent,
  IonCol,
  IonIcon,
  IonLoading,
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

import CardComponent from "@sections/home/home-card";
import { useMemo } from "react";
const MAX_REFERALS = 3;

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
          estimatedAge: "",
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
      console.log("REFER SUBMIT DATA", data);
      const { beneficiaries } = data;
      const referredBeneficiaries = beneficiaries.map(
        (el: REFER_BENEFICIARY_DETAILS) => {
          return {
            ...el,
            phone: `${el?.fullPhone}`,
          };
        }
      );
      console.log("Referred beneficiares", referredBeneficiaries);

      const response = await referBeneficiaries({
        referredBeneficiaries,
        beneficiaryVoucher,
        beneficiaryAddress: beneficiaryDetails?.walletAddress,
        beneficiaryDetails,
      });
      history.push("/refer-result", {
        data: { data: response, from, beneficiaryVoucher },
      });
    } catch (error) {
      showToast(
        error?.message || "Something went wrong! Try again later.",
        "danger"
      );
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
      });
    }
  };

  const handleRemove = (index: number) => {
    if (index > 0) remove(index);
  };

  const handleDisabledAddMore = (condition: boolean) => {
    if (condition)
      showToast("You can only refer up to 3 beneficiaries", "danger");
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
      <IonLoading mode="md" isOpen={isSubmitting} message={"Please wait..."} />
      <CardComponent
        subtitle="Total Available Referrals"
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
                  estimatedAge: "",
                  address: "",
                  code: "",
                  iso: "",
                  fullPhone: "",
                })
              }
              disabled={isMaxReferralsReached}
            >
              <IonIcon icon={add} />
              Add More
            </IonButton>
          </div>
          <br />
          <br />

          <IonCol size="12" className="px-0">
            {errors?.beneficiaries?.length && isSubmitted && (
              <IonText color="danger">
                Please fill in all required fields correctly.
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
            Submit
          </IonButton>
        </IonCardContent>
      </TransparentCard>
    </form>
  );
};

export default ReferBeneficiaries;
