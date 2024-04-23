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
import { handleError } from "@utils/errorHandler";
import { useTranslation } from "react-i18next";

export interface SelectOptionItem {
  text: string;
  value: string;
  iso: string;
  countryId?: string | undefined;
}

const Register = () => {
  const { handleRegister } = useAppStore();
  const history = useHistory();
  const { t } = useTranslation();
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
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
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
                    placeholder={t("REGISTER_PAGE.PLACEHOLDERS.NAME")}
                    type="text"
                    label={t("REGISTER_PAGE.LABELS.NAME")}
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
                  required: t("REGISTER_PAGE.ERRORS.NAME"),
                }}
                control={control}
                name="name"
              />
              <br />
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
                            return t("REGISTER_PAGE.ERRORS.CODE");
                        },
                        validatePhoneNumber: (value) => {
                          if (!getValues("phone"))
                            return t("REGISTER_PAGE.ERRORS.PHONE");
                        },
                        validateFullPhone: (value) => {
                          if (!getValues("fullPhone"))
                            return t("REGISTER_PAGE.ERRORS.PHONE");
                        },
                      },
                    }}
                    render={(field) => (
                      <CountryCodeInput
                        label={t("REGISTER_PAGE.LABELS.PHONE")}
                        clearInput={false}
                        codePlaceholder={t("REGISTER_PAGE.PLACEHOLDERS.CODE")}
                        phonePlaceholder={t("REGISTER_PAGE.PLACEHOLDERS.PHONE")}
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
                  t("REGISTER_PAGE.BUTTONS.SUBMIT")
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
                {t("REGISTER_PAGE.BUTTONS.CANCEL")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default Register;
