import {
  IonButton,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./restore.scss";
import useAppStore from "@store/app";
import TextInputFieldMultiLine from "@components/input/form-text-input-multiline";
import { handleError } from "@utils/errorHandler";
import { useTranslation } from "react-i18next";
import CustomLoader from "@components/loaders/customLoader";

const RestoreWallet = () => {
  const { t } = useTranslation();
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
      await new Promise((resolve) => setTimeout(resolve, 0));
      history.push("/select-project", {
        data: { from: "restore" },
      });
    } catch (error: any) {
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
  };

  return (
    <>
      <CustomLoader isOpen={isSubmitting} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <IonGrid className="restore-container">
          <IonRow className="restore-form-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <Controller
                render={({ field }) => (
                  <TextInputFieldMultiLine
                    placeholder={t(
                      "RESTORE_WALLET_PAGE.PLACEHOLDERS.PNEUMONICS"
                    )}
                    rows={5}
                    label={t("RESTORE_WALLET_PAGE.LABELS.PNEUMONICS")}
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
                    message: t("RESTORE_WALLET_PAGE.ERRORS.PNEUMONICS"),
                  },
                  pattern: {
                    value: /^([a-z]+ ){11}[a-z]+$/i,
                    message: t("RESTORE_WALLET_PAGE.ERRORS.PNEUMONICS"),
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
            </IonCol>
          </IonRow>
          <IonRow className="restore-button-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <IonButton
                mode="md"
                type="submit"
                expand="block"
                // color="dark"
                disabled={isDirty || !isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                ) : (
                  t("RESTORE_WALLET_PAGE.BUTTONS.SUBMIT")
                )}
              </IonButton>
              <IonRow className="gap-5"></IonRow>
              <IonButton
                mode="md"
                // color="dark"
                fill="outline"
                expand="block"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {t("RESTORE_WALLET_PAGE.BUTTONS.CANCEL")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default RestoreWallet;
