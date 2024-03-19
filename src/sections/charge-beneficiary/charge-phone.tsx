import TextInputField from "@components/input/form-text-input";
import { IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import { validateWalletAddress } from "../../utils/web3";

const ChargePhone = ({ getValues, errors, setValue, control }: any) => {
  return (
    <>
      <IonText>
        <p>Please enter phone number of the beneficiary.</p>
      </IonText>
      <br />
      <Controller
        render={({ field }) => (
          <TextInputField
            placeholder="Enter beneficiary's wallet address"
            type="text"
            label="Wallet Address *"
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
          validate: validateWalletAddress,
          // minLength: {
          //   value: 10,
          //   message: "Phone Number must be of 10 digits",
          // },
          // maxLength: {
          //   value: 10,
          //   message: "Phone Number must be of 10 digits",
          // },
        }}
        control={control}
        name="walletAddress"
      />
      <br />
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
