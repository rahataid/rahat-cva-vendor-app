import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

import TextInputField from "@components/input/form-text-input";
import useAppStore from "@store/app";
import useAuthStore from "@store/auth";
import { saveAppSettings } from "@utils/sessionManager";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";

const ProjectSelect = () => {
  const appStore = useAuthStore((state) => state);
  const history = useHistory();
  const setAppSettingsIdx = useAppStore((state) => state.setAppSettings);

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
      const [contracts, blockchain] = await Promise.all([
        axios.get(`${data?.project}/app/contracts`),
        axios.get(`${data?.project}/app/blockchain`),
      ]);

      if (contracts?.data && blockchain?.data) {
        const appSettings = {
          baseUrl: data?.project,
          contracts: contracts?.data?.value,
          network: blockchain?.data?.value,
        };
        console.log("first", appSettings);
        setAppSettingsIdx(appSettings);
        saveAppSettings(appSettings);

        history.push("/landing");
      }

      console.log({
        contracts,
        blockchain,
      });
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
        <IonGrid className='register-container'>
          <IonRow className='register-form-container'>
            <IonCol size='11' sizeMd='11' sizeLg='6' sizeXl='4'>
              <Controller
                render={({ field }) => (
                  <TextInputField
                    placeholder='Enter Project'
                    type='text'
                    label='Project*'
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
                name='project'
              />
              <br />

              {errors?.root?.serverError?.message && (
                <IonText color='danger'>
                  {errors?.root?.serverError.message}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className='register-button-container'>
            <IonCol size='11' sizeMd='11' sizeLg='6' sizeXl='4'>
              <IonButton
                type='submit'
                expand='block'
                color='white'
                // disabled={isDirty || !isValid || isSubmitting}
              >
                Submit
                {/* {isSubmitting ? (
                  <IonProgressBar type='indeterminate'></IonProgressBar>
                ) : (
                )} */}
              </IonButton>
              <IonRow className='gap-5'></IonRow>
              <IonButton
                color='white'
                fill='outline'
                expand='block'
                onClick={handleCancel}
                disabled={isSubmitting}>
                Cancel
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default ProjectSelect;
