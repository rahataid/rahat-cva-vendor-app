import { IonCol, IonLabel, IonRow, IonText } from "@ionic/react";
import { Controller } from "react-hook-form";
import CountryCodeInput from "@components/countryCode/countryCodeInput";
import { useTranslation } from "react-i18next";

const ChargePhone = ({
  getValues,
  errors,
  setValue,
  control,
  setError,
  trigger,
}: any) => {
  const { t } = useTranslation();
  return (
    <>
      <br />
      <IonText>
        <p>{t("CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.DESCRIPTION")}</p>
      </IonText>
      <br />
      <IonRow>
        <IonCol size="12" class="ion-no-padding">
          <Controller
            control={control}
            name="fullPhone"
            rules={{
              required: t(
                "CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.ERRORS.PHONE"
              ),
              validate: {
                validateCountryCode: (value) => {
                  if (!getValues("code"))
                    return `${t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.ERRORS.CODE"
                    )}`;
                },
                validatePhoneNumber: (value) => {
                  if (!getValues("phone"))
                    return `${t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.ERRORS.PHONE"
                    )}`;
                },
                validateFullPhone: (value) => {
                  if (!getValues("fullPhone"))
                    return `${t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.ERRORS.PHONE"
                    )}`;
                },
              },
            }}
            render={(field) => (
              <CountryCodeInput
                clearInput={false}
                label={t("CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.LABELS.PHONE")}
                codePlaceholder={t(
                  "CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.PLACEHOLDERS.CODE"
                )}
                phonePlaceholder={t(
                  "CHARGE_BENEFICIARY_PAGE.SEGMENTS.PHONE.PLACEHOLDERS.PHONE"
                )}
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
