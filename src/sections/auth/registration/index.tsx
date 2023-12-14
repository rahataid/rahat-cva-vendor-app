import {
  IonButton,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";

import TextInputField from "@components/input/form-text-input";
import useAuthStore from "@store/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import MnemonicDialog from "./mnemonicDialog";
import "./register.scss";

const Register = () => {
  const authStore = useAuthStore((state) => state);
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
      name: "",
      phone: "",
      address: {
        city: "ktm",
      },
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const walletValue = await authStore.handleRegister(data);
      if (walletValue) {
        setMnemonics(walletValue.mnemonic.phrase);
      }
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
      console.log("REGISTER SERVER ERROR", JSON.stringify(error));
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
      <MnemonicDialog isOpen={mnemonics ? true : false} mnemonics={mnemonics} />
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
                    value={getValues("name")}
                    errorText={errors?.name?.message}
                    onInput={(e: any) => {
                      setValue("name", e.target.value, {
                        shouldValidate: true,
                      });
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
                    errorText={errors?.phone?.message}
                    value={getValues("phone")}
                    onInput={(e: any) => {
                      setValue("phone", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    onBlur={field.onBlur}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter Phone number",
                  },
                  minLength: {
                    value: 6,
                    message: "Phone Number must be at least 6 digits",
                  },
                }}
                control={control}
                name="phone"
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
