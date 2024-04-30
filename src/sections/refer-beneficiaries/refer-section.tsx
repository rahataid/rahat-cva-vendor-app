// ReferSection.jsx
import CustomDivider from "@components/divider";
import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonRow,
  IonSelectOption,
} from "@ionic/react";
import { removeCircleOutline } from "ionicons/icons";
import { Controller } from "react-hook-form";
import "./refer-beneficiaries.scss";
import FormInputSelect from "@components/input/form-select-input";
import CountryCodeInput from "@components/countryCode/countryCodeInput";
import { useTranslation } from "react-i18next";

const ReferSection = ({
  index,
  getValues,
  setValue,
  setError,
  field,
  control,
  handleRemove,
  watch,
  trigger,
  formState: { isSubmitted, errors },
}: any) => {
  const { t } = useTranslation();
  return (
    <>
      <IonRow className="beneficiary-name-wrapper">
        <IonCol size="5" className="refer-section-left-col">
          <h2>
            {t("REFER_BENEFICIARIES_PAGE.BENEFICIARY")} {index + 1}
          </h2>
        </IonCol>

        <IonCol size="7" className="refer-section-right-col">
          {index > 0 && (
            <IonButton
              color="danger"
              fill="clear"
              size="small"
              onClick={handleRemove}
            >
              <IonIcon icon={removeCircleOutline} />
            </IonButton>
          )}
        </IonCol>
      </IonRow>
      <Controller
        name={`beneficiaries.${index}.name`}
        control={control}
        defaultValue={field?.name || ""}
        render={({ field }) => (
          <TextInputField
            placeholder={t("REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.NAME")}
            type="text"
            label={t("REFER_BENEFICIARIES_PAGE.LABELS.NAME")}
            value={getValues(`beneficiaries.${index}.name`)}
            errorText={errors?.beneficiaries?.[index]?.name?.message}
            onInput={(e) => {
              setValue(`beneficiaries.${index}.name`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
            isSubmitted={isSubmitted}
          />
        )}
        rules={{
          required: t("REFER_BENEFICIARIES_PAGE.ERRORS.NAME"),
        }}
      />
      <br />
      <IonRow>
        <IonCol size="12" class="ion-no-padding">
          <Controller
            control={control}
            name={`beneficiaries.${index}.fullPhone`}
            rules={{
              required: t("REFER_BENEFICIARIES_PAGE.ERRORS.PHONE"),
              validate: {
                validateCountryCode: (value) => {
                  if (!getValues(`beneficiaries.${index}.code`))
                    return t("REFER_BENEFICIARIES_PAGE.ERRORS.CODE");
                },
                validatePhoneNumber: (value) => {
                  if (!getValues(`beneficiaries.${index}.phone`))
                    return t("REFER_BENEFICIARIES_PAGE.ERRORS.PHONE");
                },
                validateFullPhone: (value) => {
                  if (!getValues(`beneficiaries.${index}.fullPhone`))
                    return t("REFER_BENEFICIARIES_PAGE.ERRORS.PHONE");
                },
              },
            }}
            render={(field) => (
              <CountryCodeInput
                label={t("REFER_BENEFICIARIES_PAGE.LABELS.PHONE")}
                watch={watch}
                codePlaceholder={t(
                  "REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.CODE"
                )}
                phonePlaceholder={t(
                  "REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.PHONE"
                )}
                onBlur={field.onBlur}
                errors={errors}
                errorText={errors?.beneficiaries?.[index]?.fullPhone?.message}
                setValue={setValue}
                setError={setError}
                getValues={getValues}
                clearInput={false}
                trigger={trigger}
                isoValue={getValues(`beneficiaries.${index}.iso`)}
                codeValue={getValues(`beneficiaries.${index}.code`)}
                phoneValue={getValues(`beneficiaries.${index}.phone`)}
                modalId={`select-phoneCode${index}`}
                onModalSelectionChange={(el: any, phoneCodeModal: any) => {
                  setValue(`beneficiaries.${index}.code`, el.value, {
                    shouldValidate: true,
                  });
                  setValue(`beneficiaries.${index}.iso`, el.iso, {
                    shouldValidate: true,
                  });
                  setError("root", {});
                  // setError(`beneficiaries.${index}.iso`, {});
                  trigger(`beneficiaries.${index}.fullPhone`);
                  phoneCodeModal.current?.dismiss();
                }}
                onPhoneChange={(e: any) => {
                  setValue(`beneficiaries.${index}.phone`, e.target.value, {
                    shouldValidate: true,
                  });
                  trigger(`beneficiaries.${index}.fullPhone`);
                }}
                onPhoneBlur={() => {
                  // field?.onBlur();
                  trigger(`beneficiaries.${index}.fullPhone`);
                }}
                combineInputs={() =>
                  setValue(
                    `beneficiaries.${index}.fullPhone`,
                    `${getValues(`beneficiaries.${index}.code`)}${getValues(
                      `beneficiaries.${index}.phone`
                    )}`
                  )
                }
              />
            )}
          />
        </IonCol>
      </IonRow>
      <br />
      <Controller
        name={`beneficiaries.${index}.gender`}
        control={control}
        defaultValue={field?.gender || ""}
        render={({ field }) => (
          <FormInputSelect
            label={t("REFER_BENEFICIARIES_PAGE.LABELS.GENDER")}
            placeholder={t("REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.GENDER")}
            errorText={errors?.beneficiaries?.[index]?.gender?.message}
            isSubmitted={isSubmitted}
            value={getValues(`beneficiaries.${index}.gender`)}
            onChange={(e) => {
              setValue(`beneficiaries.${index}.gender`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
          >
            <IonSelectOption value="MALE">
              {t("REFER_BENEFICIARIES_PAGE.SELECT.MALE")}
            </IonSelectOption>
            <IonSelectOption value="FEMALE">
              {t("REFER_BENEFICIARIES_PAGE.SELECT.FEMALE")}
            </IonSelectOption>
            <IonSelectOption value="OTHERS">
              {t("REFER_BENEFICIARIES_PAGE.SELECT.OTHERS")}
            </IonSelectOption>
          </FormInputSelect>
        )}
        rules={{
          required: t("REFER_BENEFICIARIES_PAGE.ERRORS.GENDER"),
        }}
      />

      <br />
      <Controller
        name={`beneficiaries.${index}.estimatedAge`}
        control={control}
        defaultValue={field?.estimatedAge || ""}
        render={({ field }) => (
          <TextInputField
            label={t("REFER_BENEFICIARIES_PAGE.LABELS.AGE")}
            placeholder={t("REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.AGE")}
            type="number"
            value={getValues(`beneficiaries.${index}.estimatedAge`)}
            errorText={errors?.beneficiaries?.[index]?.estimatedAge?.message}
            onInput={(e) => {
              setValue(`beneficiaries.${index}.estimatedAge`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
            isSubmitted={isSubmitted}
          />
        )}
        rules={{
          required: t("REFER_BENEFICIARIES_PAGE.ERRORS.AGE"),
        }}
      />
      <br />
      <Controller
        name={`beneficiaries.${index}.address`}
        control={control}
        defaultValue={field?.address || ""}
        render={({ field }) => (
          <TextInputField
            placeholder={t("REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.ADDRESS")}
            type="text"
            label={t("REFER_BENEFICIARIES_PAGE.LABELS.ADDRESS")}
            value={getValues(`beneficiaries.${index}.address`)}
            errorText={errors?.beneficiaries?.[index]?.address?.message}
            onInput={(e) => {
              setValue(`beneficiaries.${index}.address`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
            isSubmitted={isSubmitted}
          />
        )}
      />
      <br />

      <CustomDivider style={{ marginBottom: "15px" }} />
    </>
  );
};

export default ReferSection;
