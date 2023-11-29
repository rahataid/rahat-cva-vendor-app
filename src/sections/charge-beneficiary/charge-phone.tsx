import TextInputField from "@components/input/form-text-input";
import { IonCardSubtitle, IonRow, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";

const ChargePhone = ({ getValues, errors, setValue, control }: any) => {
  return (
    <>
      <IonCardSubtitle>
        You are about to send tokens to this beneficiary. Please enter phone
        number of the beneficiary.
      </IonCardSubtitle>
      <IonRow className="gap-25"></IonRow>
      <Controller
        render={({ field }) => (
          <TextInputField
            placeholder="Enter Phone"
            type="text"
            label="Phone*"
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
      <br />
      <Controller
        render={({ field }) => (
          <TextInputField
            placeholder="Token"
            type="text"
            label="Token*"
            errorText={errors?.token?.message}
            value={getValues("token")}
            onInput={(e: any) => {
              setValue("token", e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field.onBlur}
          />
        )}
        rules={{
          required: "Please enter token amount",
        }}
        control={control}
        name="token"
      />
      <br />
      {errors?.root?.serverError?.message && (
        <IonText color="danger">{errors?.root?.serverError.message}</IonText>
      )}
    </>
  );
};

export default ChargePhone;
