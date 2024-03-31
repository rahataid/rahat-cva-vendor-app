import TextInputField from "@components/input/form-text-input";
import { IonButton, IonCol, IonIcon, IonRow, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import { validateWalletAddress } from "../../utils/web3";
import { qrCodeOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const ChargeQr = ({ getValues, errors, setValue, control }: any) => {
  const history = useHistory();
  const handleScanClick = () => {
    history.push("/scanner", {
      data: { redirectTo: "/tabs/charge-beneficiary" },
    });
  };
  return (
    <>
      <br />
      <IonText>
        <p>Please enter wallet address of the beneficiary.</p>
      </IonText>
      <br />
      <IonRow>
        <IonCol size="10" class="ion-no-padding">
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
        </IonCol>
        <IonCol size="0.1" class="ion-no-padding"></IonCol>
        <IonCol size="1" class="ion-no-padding">
          <IonButton
            fill="solid"
            className="scan-btn"
            onClick={handleScanClick}
          >
            <IonIcon slot="icon-only" icon={qrCodeOutline}></IonIcon>
          </IonButton>
        </IonCol>
      </IonRow>
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
