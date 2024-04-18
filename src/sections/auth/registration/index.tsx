import {
  IonButton,
  IonCol,
  IonGrid,
  IonLabel,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";

import TextInputField from "@components/input/form-text-input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import MnemonicDialog from "./mnemonicDialog";
import "./register.scss";
import useAppStore from "@store/app";
import CountryCodeInput from "@components/countryCode/countryCodeInput";

export interface SelectOptionItem {
  text: string;
  value: string;
  iso: string;
  countryId?: string | undefined;
}

const Register = () => {
  const { handleRegister } = useAppStore();
  const history = useHistory();

  const [mnemonics, setMnemonics] = useState(undefined);

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      phone: undefined,
      address: {
        city: "ktm",
      },
      code: "",
      iso: "",
      fullPhone: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data?.name,
        phone: data?.fullPhone,
      };

      const walletValue = await handleRegister(payload);
      if (walletValue) {
        setMnemonics(walletValue.mnemonic.phrase);
      }
    } catch (error) {
      console.log("REGISTER SERVER ERROR", JSON.stringify(error));
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
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
            {/* <IonCol size="12" sizeMd="12" sizeLg="6" sizeXl="4"></IonCol> */}
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
              <div className="ion-margin-top-sm">
                <IonLabel class={`text-input-label`}>Phone Number*</IonLabel>
              </div>
              <IonRow>
                <IonCol size="12" class="ion-no-padding">
                  <Controller
                    control={control}
                    name="fullPhone"
                    rules={{
                      required: "Please enter valid phone number",
                      validate: {
                        validateCountryCode: (value) => {
                          if (!getValues("code"))
                            return "Please enter country code";
                        },
                        validatePhoneNumber: (value) => {
                          if (!getValues("phone"))
                            return "Please enter phone number";
                        },
                        validateFullPhone: (value) => {
                          if (!getValues("fullPhone"))
                            return "Please enter phone number";
                        },
                      },
                    }}
                    render={(field) => (
                      <CountryCodeInput
                        clearInput={false}
                        codePlaceholder="Code"
                        phonePlaceholder="Phone number"
                        errors={errors}
                        errorText={errors?.fullPhone?.message}
                        isoValue={getValues("iso")}
                        codeValue={getValues("code")}
                        phoneValue={getValues("phone")}
                        modalId="select-phoneCode"
                        onModalSelectionChange={(
                          el: any,
                          phoneCodeModal: any
                        ) => {
                          setValue("code", el.value, {
                            shouldValidate: true,
                          });
                          setValue("iso", el.iso, {
                            shouldValidate: true,
                          });
                          setError("root", {});
                          trigger("fullPhone");
                          phoneCodeModal.current?.dismiss();
                        }}
                        onPhoneChange={(e: any) => {
                          setValue("phone", e.target.value, {
                            shouldValidate: true,
                          });
                          trigger("fullPhone");
                        }}
                        onPhoneBlur={() => {
                          trigger("fullPhone");
                        }}
                        combineInputs={() =>
                          setValue(
                            "fullPhone",
                            `${getValues("code")}${getValues("phone")}`
                          )
                        }
                      />
                    )}
                  />
                </IonCol>
              </IonRow>
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
                mode="md"
                type="submit"
                expand="block"
                // color="dark"
                disabled={!isValid || isSubmitting}
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
                // color="dark"
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
