import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./restore.scss";
import useAppStore from "@store/app";
import TextInputFieldMultiLine from "@components/input/form-text-input-multiline";

const RestoreWallet = () => {
  const history = useHistory();
  const { handleRestore } = useAppStore();
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
      console.log(error);
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
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
                <TextInputFieldMultiLine
                  placeholder="Please enter 12 words pneumonics"
                  rows={5}
                  label="Pneumonics*"
                  labelPlacement="stacked"
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
              mode="md"
              type="submit"
              expand="block"
              color="dark"
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
              mode="md"
              color="dark"
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
