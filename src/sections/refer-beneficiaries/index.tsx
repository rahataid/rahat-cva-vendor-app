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
  BENEFICIARY_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_BENEFICIARY_DETAILS,
} from "@types/beneficiaries";
import useTransactionStore from "@store/transaction";
import { generateRandomWalletAddress } from "@utils/web3";
import CustomToast from "../../components/toast";
import useCustomToast from "../../hooks/use-custom-toast";
import useAppStore from "../../store/app";

type Props = {
  data: {
    voucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryAddress: string;
    from: string;
    beneficiaryDetails: BENEFICIARY_DETAILS;
  };
};

const ReferBeneficiaries = ({
  data: { voucher, beneficiaryAddress, from, beneficiaryDetails },
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
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiaries",
    max: 3,
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("REFER SUBMIT DATA", data);
      const { beneficiaries } = data;
      const referredBeneficiaries = beneficiaries.map(
        (el: REFER_BENEFICIARY_DETAILS) => {
          return {
            ...el,
            phone: `${el.code}${el?.phone}`,
          };
        }
      );
      console.log("Referred beneficiares", referredBeneficiaries);

      const response = await referBeneficiaries({
        referredBeneficiaries,
        voucher,
        beneficiaryAddress,
        beneficiaryDetails,
      });
      history.push("/refer-result", {
        data: { data: response, from, voucher },
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={hideToast}
        message={toastMessage}
        duration={2000}
        position="middle"
        color={toastColor}
      />
      <IonLoading mode="md" isOpen={isSubmitting} message={"Please wait..."} />
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
              />
            </div>
          ))}

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
              })
            }
            disabled={fields.length >= 3}
          >
            <IonIcon icon={add} />
            Add More
          </IonButton>
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
            disabled={isLoading || isSubmitting}
          >
            Submit
          </IonButton>
        </IonCardContent>
      </TransparentCard>
    </form>
  );
};

export default ReferBeneficiaries;
