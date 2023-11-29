import TextInputField from "@components/input/form-text-input";
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
import { useProject } from "@services/contracts/useProject";
import useAppStore from "@store/app";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";

const OTP = () => {
  const history = useHistory();
  const { processTokenRequest } = useProject();
  const { beneficiary } = useAppStore((state) => ({
    beneficiary: state.beneficiary,
  }));

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
      otp: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const tx = await processTokenRequest(beneficiary, data.otp);

      if (tx) {
        const receipt = await tx.wait();
        if (receipt.status) {
          history.push("/tabs/home");
        }
      }
    } catch (error) {
      // alert(JSON.stringify(error, null, 2));
      console.log("OTP SERVER ERROR", JSON.stringify(error));
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <IonGrid className="restore-container">
        <IonRow className="restore-form-container">
          <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Enter OTP"
                  type="text"
                  label="OTP*"
                  value={getValues("otp")}
                  errorText={errors?.otp?.message}
                  onInput={(e: any) => {
                    setValue("otp", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  onBlur={field.onBlur}
                />
              )}
              rules={{
                required: "Please enter OTP",
              }}
              control={control}
              name="otp"
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

export default OTP;
