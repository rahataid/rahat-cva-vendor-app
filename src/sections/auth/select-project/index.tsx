import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonProgressBar,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import TextInputField from "@components/input/form-text-input";
import useAuthStore from "@store/auth";
import { useState } from "react";

const Register = () => {
  const appStore = useAuthStore((state) => state);
  const history = useHistory();

  const [mnemonics, setMnemonics] = useState(undefined);

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      project: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      //  get project info
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
      console.log("SELECT PROJECT SERVER ERROR", JSON.stringify(error));
      setError("root.serverError", {
        type: "manual",
        message: "Something went wrong! Try again later.",
      });
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <IonGrid className="register-container">
          <IonRow className="register-form-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <Controller
                render={({ field }) => (
                  <TextInputField
                    placeholder="Enter Project"
                    type="text"
                    label="Project*"
                    value={getValues("project")}
                    errorText={errors?.project?.message}
                    onInput={(e: any) => {
                      setValue("project", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    onBlur={field.onBlur}
                  />
                )}
                rules={{
                  required: "Please enter your project name",
                }}
                control={control}
                name="project"
              />
              <br />

              {errors?.root?.serverError?.message && (
                <IonText color="danger">
                  {errors?.root?.serverError.message}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="register-button-container">
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
    </>
  );
};

export default Register;
