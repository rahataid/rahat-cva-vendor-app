import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import useAppStore from "@store/app";
import { saveWalletInfo } from "@utils/sessionManager";
import { getWalletUsingMnemonic } from "@utils/web3";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { DEFAULT_PASSCODE } from "../../../config";
import "./restore.scss";
import useAuthStore from "@store/auth";

const RestoreWallet = () => {
  const history = useHistory();
  const handleRestore = useAuthStore((state) => state.handleRestore);
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
      await handleRestore(data.pneumonics);

      history.push("/select-project", {
        data: { from: "restore" },
      });
    } catch (error: any) {
      if (error?.name === "P2025" && error?.message == "No Vendor found")
        setError("root.serverError", {
          type: "manual",
          message: "Vendor doesn't exist.",
        });
      else
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
                  onInput={(e: any) => {
                    setValue("pneumonics", e.target.value, {
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
              disabled={isSubmitting}
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
