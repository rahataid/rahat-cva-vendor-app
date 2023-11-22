import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./restore.scss";
import { Controller, useForm } from "react-hook-form";
import TextInputField from "@components/input/form-text-input";

const RestoreWallet = () => {
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      pneumonics: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
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
              disabled={isDirty || !isValid}
            >
              Submit
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
