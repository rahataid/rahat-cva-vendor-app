import TextInputField from "@components/input/form-text-input";
import InputSelect from "@components/select/form-select-input";
import { IonCol, IonRow, IonText } from "@ionic/react";
import "./redeem-voucher.scss";
import { SelectInputOptions } from "../../types/chargeBeneficiary";
import { Controller } from "react-hook-form";

type Props = {
  options: SelectInputOptions;
};

const BeneficiaryDetails = ({
  options,
  getValues,
  errors,
  setValue,
  control,
}: any) => {
  return (
    <>
      <IonText>
        <h2>Beneficiary Details</h2>
      </IonText>
      <br />
      <IonRow>
        <IonCol size="6">
          <Controller
            render={({ field }) => (
              <TextInputField
                placeholder="Enter Age"
                type="text"
                label="Age *"
                value={getValues("age")}
                errorText={errors?.age?.message}
                onInput={(e: any) => {
                  setValue("age", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={field.onBlur}
              />
            )}
            rules={{
              required: "Please enter age",
            }}
            control={control}
            name="age"
          />
        </IonCol>
        <IonCol size="6">
          <Controller
            render={({ field }) => (
              <InputSelect
                label="Gender *"
                labelPlacement="stacked"
                options={options}
                placeholder="Select Gender"
                errorText={errors?.gender?.message}
                onInput={(e: any) => {
                  setValue("gender", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={field.onBlur}
                value={getValues("gender")}
              />
            )}
            rules={{
              required: "Please enter gender",
            }}
            control={control}
            name="gender"
          />
        </IonCol>
        {errors?.root?.serverError?.message && (
          <>
            <IonText color="danger">
              {errors?.root?.serverError.message}
            </IonText>
            <br />
          </>
        )}
      </IonRow>
    </>
  );
};

export default BeneficiaryDetails;
