import TextInputField from "@components/input/form-text-input";
import { IonText } from "@ionic/react";
import { Controller } from "react-hook-form";

const ChargePhone = ({ getValues, errors, setValue, control }: any) => {
  return (
    <>
      <IonText>
        <p>
          You are about to send tokens a beneficiary.
          <br />
          Please enter phone number of the beneficiary.
        </p>
      </IonText>
      <br />
      <Controller
        render={({ field }) => (
          <TextInputField
            placeholder="Enter Phone"
            type="text"
            label="Phone Number *"
            value={getValues("phone")}
            errorText={errors?.phone?.message}
            onInput={(e: any) => {
              setValue("phone", e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field.onBlur}
          />
        )}
        rules={{
          required: "Please enter phone number",
        }}
        control={control}
        name="phone"
      />

      {errors?.root?.serverError?.message && (
        <>
          <IonText color="danger">{errors?.root?.serverError.message}</IonText>
          <br />
        </>
      )}
    </>
  );
};

export default ChargePhone;
