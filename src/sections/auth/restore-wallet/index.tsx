import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./restore.scss";
import { Controller, useForm } from "react-hook-form";
import TextInputField from "@components/input/form-text-input";
import { getWalletUsingMnemonic } from "@utils/web3";
import { DEFAULT_PASSCODE } from "../../../config";
import useStorage from "../../../store/storage";

const RestoreWallet = () => {
  const history = useHistory();
  const setWallet = useStorage.getState().setWallet;
  const setWalletState = useStorage.getState().setWalletState;
  const handleCancel = () => {
    history.goBack();
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      pneumonics: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const wallet = getWalletUsingMnemonic(data.pneumonics);

      //  save wallet info in localstorage by encrypting with passcode in .env file
      const encryptedWallet = await wallet.encrypt(DEFAULT_PASSCODE);
      await setWallet(encryptedWallet);

      await setWalletState(wallet);
      history.replace("/tabs/home");
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "Something went wrong! Try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <IonGrid className="restore-container">
        <IonRow className="restore-form-container">
          <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Please enter 12 words pneumonics"
                  type="text"
                  label="Pneumonics*"
                  errorText={errors.pneumonics?.message}
                  value={getValues("pneumonics")}
                  onInput={(e: { detail: { value: string } }) => {
                    setValue("pneumonics", e.detail.value, {
                      shouldValidate: true,
                    });
                  }}
                  onBlur={field.onBlur}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Please enter 12 words pneumonics",
                },
                pattern: {
                  value: /^([a-z]+ ){11}[a-z]+$/i,
                  message: "Invalid pneumonics",
                },
              }}
              control={control}
              name="pneumonics"
            />
            <br />
            {errors?.root?.serverError?.message && (
              <IonText color="danger">
                {errors?.root?.serverError.message}
              </IonText>
            )}
            {/* <IonTextarea
                  label=""
                  placeholder="Please enter 12 words pneumonics"
                ></IonTextarea> */}
          </IonCol>
        </IonRow>
        <IonRow className="restore-button-container">
          <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
            <IonButton
              type="submit"
              expand="block"
              color="white"
              disabled={isDirty || !isValid || isSubmitting}
            >
              {isSubmitting ? (
                <IonProgressBar type="indeterminate"></IonProgressBar>
              ) : (
                "Submit"
              )}
            </IonButton>
            <IonRow className="gap-5"></IonRow>
            <IonButton
              color="white"
              fill="outline"
              expand="block"
              onClick={handleCancel}
            >
              Cancel
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default RestoreWallet;
