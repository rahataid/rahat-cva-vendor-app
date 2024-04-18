import { IonCol, IonLabel, IonRow, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import CountryCodeInput from "@components/countryCode/countryCodeInput";

const ChargePhone = ({
  getValues,
  errors,
  setValue,
  control,
  setError,
  trigger,
}: any) => {
  return (
    <>
      <br />
      <IonText>
        <p>Please enter phone number of the beneficiary.</p>
      </IonText>
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
                  if (!getValues("code")) return "Please enter country code";
                },
                validatePhoneNumber: (value) => {
                  if (!getValues("phone")) return "Please enter phone number";
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
                onModalSelectionChange={(el: any, phoneCodeModal: any) => {
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
        <>
          <br />
          <IonText color="danger">{errors?.root?.serverError.message}</IonText>
        </>
      )}
      <br />
    </>
  );
};

export default ChargePhone;
