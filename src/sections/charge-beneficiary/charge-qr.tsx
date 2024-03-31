import TextInputField from "@components/input/form-text-input";
import { IonCardSubtitle, IonContent, IonRow, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import { validateWalletAddress } from "../../utils/web3";

const ChargeQr = ({ getValues, errors, setValue, control }: any) => {
  return (
    <>
      <br />
      <IonText>
        <p>Please enter wallet address of the beneficiary.</p>
      </IonText>
      <br />
      <Controller
        render={({ field }) => (
          <TextInputField
            label="Wallet Address*"
            placeholder="Enter wallet address"
            type="text"
            value={getValues("walletAddress")}
            errorText={errors?.walletAddress?.message}
            onInput={(e: any) => {
              setValue("walletAddress", e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field.onBlur}
          />
        )}
        rules={{
          required: "Please enter valid wallet address",
          validate: {
            validateInput: (value) =>
              (validateWalletAddress(value) && value.length === 42) ||
              "Please enter a valid wallet address",
          },
        }}
        control={control}
        name="walletAddress"
      />
      {errors?.root?.serverError?.message && (
        <>
          <br />
          <IonText color="danger">{errors?.root?.serverError.message}</IonText>
        </>
      )}
      <br />
    </>
  );
};

export default ChargeQr;
