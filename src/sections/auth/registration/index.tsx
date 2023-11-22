import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./register.scss";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import TextInputField from "@components/input/form-text-input";

const Register = () => {
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
      name: "",
      phone: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <IonGrid className="register-container">
        <IonRow className="register-form-container">
          <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Enter Name"
                  type="text"
                  label="Name*"
                  value={field.value}
                  errorText={errors.name?.message}
                  onInput={(e: any) => {
                    setValue("name", e.detail.value, { shouldValidate: true });
                  }}
                  onBlur={field.onBlur}
                />
              )}
              rules={{
                required: "Please enter your full name",
              }}
              control={control}
              name="name"
            />
            <br />
            <Controller
              render={({ field }) => (
                <TextInputField
                  placeholder="Phone"
                  type="text"
                  label="Phone*"
                  errorText={errors.phone?.message}
                  value={getValues("phone")}
                  onInput={(e: { detail: { value: string } }) => {
                    setValue("phone", e.detail.value, { shouldValidate: true });
                  }}
                  onBlur={field.onBlur}
                />
              )}
              rules={{
                required: { value: true, message: "Please enter Phone number" },
                minLength: {
                  value: 6,
                  message: "Phone Number must be at least 6 digits",
                },
              }}
              control={control}
              name="phone"
            />
          </IonCol>
        </IonRow>
        <IonRow className="register-button-container">
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

export default Register;
