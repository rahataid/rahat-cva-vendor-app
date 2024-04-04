import {
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonLabel,
  IonModal,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";

import TextInputField from "@components/input/form-text-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import MnemonicDialog from "./mnemonicDialog";
import "./register.scss";
import useAppStore from "@store/app";
import { caretDownOutline } from "ionicons/icons";
import PhoneCodeSelector from "../../../components/modals/phoneCodeSelector";

export interface SelectOptionItem {
  text: string;
  value: string;
  iso: string;
  countryId?: string | undefined;
}

const Register = () => {
  const phoneCodeModal = useRef<HTMLIonModalElement>(null);
  const { countries, handleRegister } = useAppStore();
  const history = useHistory();

  const [mnemonics, setMnemonics] = useState(undefined);

  const [countryName, setCountryName] = useState("");
  const [countryIso, setCountryIso] = useState("");

  const phoneCodeOptions: SelectOptionItem[] | undefined = countries?.map(
    (it) => ({
      text: `${it.name} (${it.phoneCode})`,
      value: it.phoneCode,
      iso: it.iso,
      id: it.id,
    })
  );

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      phone: undefined,
      address: {
        city: "ktm",
      },
      iso: "",
      code: "",
      countryId: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data?.name,
        phone: `${data?.code}${data?.phone}`,
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

  const fetchLocation = async (cList: any[]) => {
    const countryISO = null;
    // const countryISO = await getGeoLocation();
    let country = cList?.find((c) => c.iso == countryISO);
    if (country) {
      setValue("code", country.phoneCode);
      watch("code", country.phoneCode);
      watch("iso", country.iso);
      setValue("iso", country.iso);
      setValue("countryId", country.id);
      setCountryName(country.name);
      setCountryIso(country.iso);
    }
  };

  useEffect(() => {
    const list = countries;

    if (list && list?.length > 0) {
      fetchLocation(list);
    }

    watch("phone");
  }, [countries]);

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
              {/* <Controller
                render={({ field }) => (
                  <TextInputField
                    placeholder="Phone"
                    type="number"
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
                }}
                control={control}
                name="phone"
              /> */}
              <div className="ion-margin-top-sm">
                <IonLabel class={`text-input-label`}>Phone Number*</IonLabel>
              </div>
              <IonRow>
                <IonCol size="4" class="ion-no-padding">
                  <div className="wrapper-input">
                    {getValues("iso") && (
                      <IonImg
                        src={`assets/flags/small/${getValues(
                          "iso"
                        )?.toLocaleLowerCase()}.svg`}
                        data-testid="registraton_form_image_flags"
                      />
                    )}

                    <TextInputField
                      id="select-phoneCode"
                      clearInput={false}
                      value={getValues("code")}
                      additionalClass=""
                      placeholder="0000"
                      rightIcon={caretDownOutline}
                      hideRightIconBG
                    />
                  </div>
                  <IonModal
                    trigger="select-phoneCode"
                    ref={phoneCodeModal}
                    canDismiss={true}
                  >
                    <PhoneCodeSelector
                      title="Choose your country Code"
                      searchPlaceholder="Enter country code"
                      items={phoneCodeOptions || []}
                      selectedItem={getValues("code")}
                      onSelectionCancel={() =>
                        phoneCodeModal.current?.dismiss()
                      }
                      onSelectionChange={(el: any) => {
                        setValue("code", el.value, { shouldValidate: true });
                        setValue("iso", el.iso, { shouldValidate: true });
                        setValue("countryId", el.id, { shouldValidate: true });
                        setError("root", {});
                        phoneCodeModal.current?.dismiss();
                      }}
                      data-testid="registration_form_selector_phone_code"
                    />
                  </IonModal>
                </IonCol>
                <IonCol
                  size="8"
                  class="ion-no-padding "
                  style={{ paddingLeft: 3 }}
                >
                  <Controller
                    render={({ field }) => (
                      <TextInputField
                        type="number"
                        value={getValues("phone")}
                        placeholder="Phone number"
                        error={errors?.phone?.message ? true : false}
                        onInput={(e: any) => {
                          setError("root", {});
                          setValue("phone", e.target.value, {
                            shouldValidate: true,
                          });
                          console.log(errors);
                        }}
                        onFocus={(e: any) => {
                          setError("root", {});
                          // setValue('phone', e.target.value, { shouldValidate: true });
                        }}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter a valid phone number",
                      },
                    }}
                    control={control}
                    name="phone"
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
                disabled={!isDirty || !isValid || isSubmitting}
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
