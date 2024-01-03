import TextInputField from "@components/input/form-text-input";
import { IonCardSubtitle, IonRow, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";

const ChargeQr = ({ getValues, errors, setValue, control }: any) => {
  return (
    <>
      <IonCardSubtitle>Scanner will be here soon...</IonCardSubtitle>
      {/* <IonCardSubtitle>
        You are about to send tokens to this beneficiary. Please enter QR code
        of the beneficiary.
      </IonCardSubtitle>
      <IonRow className="gap-25"></IonRow>
      <Controller
        render={({ field }) => (
          <TextInputField
            placeholder="Enter Beneficiary QR Code"
            type="text"
            label="Qr Code*"
            value={getValues("qrCode")}
            errorText={errors?.qrCode?.message}
            onInput={(e: any) => {
              setValue("qrCode", e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field.onBlur}
          />
        )}
        rules={{
          required: "Please enter beneficiary qrCode",
        }}
        control={control}
        name="qrCode"
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
      )} */}
    </>
  );
};

export default ChargeQr;
