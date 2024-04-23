// ReferSection.jsx
import CustomDivider from "@components/divider";
import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonImg,
  IonLabel,
  IonModal,
  IonRow,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { caretDownOutline, removeCircleOutline } from "ionicons/icons";
import { Controller, useFormState } from "react-hook-form";
import "./refer-beneficiaries.scss";
import FormInputSelect from "@components/input/form-select-input";
import PhoneCodeSelector from "@components/modals/phoneCodeSelector";
import { SelectOptionItem } from "@sections/auth/registration";
import { useRef } from "react";
import useAppStore from "@store/app";
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
                  console.log("iso", el.iso);
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
          <FormInputSelect
            label={t("REFER_BENEFICIARIES_PAGE.LABELS.AGE")}
            placeholder={t("REFER_BENEFICIARIES_PAGE.PLACEHOLDERS.AGE")}
            errorText={errors?.beneficiaries?.[index]?.estimatedAge?.message}
            isSubmitted={isSubmitted}
            value={getValues(`beneficiaries.${index}.estimatedAge`)}
            onChange={(e) => {
              setValue(`beneficiaries.${index}.estimatedAge`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
          >
            <IonSelectOption value="0-5">0-5</IonSelectOption>
            <IonSelectOption value="6-10">6-10</IonSelectOption>
            <IonSelectOption value="11-15">11-15</IonSelectOption>
            <IonSelectOption value="16-20">16-20</IonSelectOption>
            <IonSelectOption value="21-25">21-25</IonSelectOption>
            <IonSelectOption value="26-30">26-30</IonSelectOption>
            <IonSelectOption value="31-35">31-35</IonSelectOption>
            <IonSelectOption value="36-40">36-40</IonSelectOption>
            <IonSelectOption value="41-45">41-45</IonSelectOption>
            <IonSelectOption value="46-50">46-50</IonSelectOption>
            <IonSelectOption value="51-55">51-55</IonSelectOption>
            <IonSelectOption value="56-60">56-60</IonSelectOption>
            <IonSelectOption value="61-65">61-65</IonSelectOption>
            <IonSelectOption value="66-70">66-70</IonSelectOption>
            <IonSelectOption value="71-75">71-75</IonSelectOption>
            <IonSelectOption value="76-80">76-80</IonSelectOption>
            <IonSelectOption value="81-85">81-85</IonSelectOption>
            <IonSelectOption value="86-90">86-90</IonSelectOption>
            <IonSelectOption value="91-95">91-95</IonSelectOption>
            <IonSelectOption value="96-100">96-100</IonSelectOption>
          </FormInputSelect>
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
