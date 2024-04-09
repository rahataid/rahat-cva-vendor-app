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

const ReferSection = ({
  index,
  getValues,
  setValue,
  setError,
  field,
  control,
  formState: { isSubmitted, errors },
  handleRemove,
  remove,
}: any) => {
  const phoneCodeModal = useRef<HTMLIonModalElement>(null);
  const { countries, handleRegister } = useAppStore();
  const phoneCodeOptions: SelectOptionItem[] | undefined = countries?.map(
    (it) => ({
      text: `${it.name} (${it.phoneCode})`,
      value: it.phoneCode,
      iso: it.iso,
      id: it.id,
    })
  );
  return (
    <>
      <IonRow className="beneficiary-name-wrapper">
        <IonCol size="5" className="refer-section-left-col">
          <h2>Beneficiary {index + 1}</h2>
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
            placeholder="Enter Name"
            type="text"
            label="Name*"
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
          required: "Please enter your full name",
        }}
      />
      <br />
      <div className="ion-margin-top-sm">
        <IonLabel class={`text-input-label`}>Phone Number*</IonLabel>
      </div>
      <IonRow>
        <IonCol size="4" class="ion-no-padding">
          <div className="wrapper-input">
            {getValues(`beneficiaries.${index}.iso`) && (
              <IonImg
                src={`assets/flags/small/${getValues(
                  `beneficiaries.${index}.iso`
                )?.toLocaleLowerCase()}.svg`}
              />
            )}
            <Controller
              render={(field) => (
                <TextInputField
                  className="select-phoneCode"
                  id={`select-phoneCode${index}`}
                  clearInput={false}
                  value={getValues(`beneficiaries.${index}.code`)}
                  additionalClass=""
                  placeholder="0000"
                  rightIcon={caretDownOutline}
                  hideRightIconBG
                  onBlur={field.onBlur}
                />
              )}
              rules={{ required: "Please enter country code" }}
              control={control}
              name={`beneficiaries.${index}.code`}
            />
          </div>
          <IonModal
            trigger={`select-phoneCode${index}`}
            ref={phoneCodeModal}
            canDismiss={true}
          >
            <PhoneCodeSelector
              title="Choose your country Code"
              searchPlaceholder="Enter country code"
              items={phoneCodeOptions || []}
              selectedItem={getValues(`beneficiaries.${index}.code`)}
              onSelectionCancel={() => phoneCodeModal.current?.dismiss()}
              onSelectionChange={(el: any) => {
                setValue(`beneficiaries.${index}.code`, el.value, {
                  shouldValidate: true,
                });
                setValue(`beneficiaries.${index}.iso`, el.iso, {
                  shouldValidate: true,
                });
                setValue("countryId", el.id, { shouldValidate: true });
                setError("root", {});
                phoneCodeModal.current?.dismiss();
              }}
              data-testid="registration_form_selector_phone_code"
            />
          </IonModal>
        </IonCol>
        <IonCol size="8" class="ion-no-padding " style={{ paddingLeft: 3 }}>
          <Controller
            render={({ field }) => (
              <TextInputField
                type="number"
                value={getValues(`beneficiaries.${index}.phone`)}
                placeholder="Phone number"
                error={
                  errors?.beneficiaries?.[index]?.phone?.message ? true : false
                }
                onInput={(e: any) => {
                  setError("root", {});
                  setValue(`beneficiaries.${index}.phone`, e.target.value, {
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
            name={`beneficiaries.${index}.phone`}
          />
        </IonCol>
      </IonRow>
      {errors?.beneficiaries?.[index]?.phone?.message && (
        <IonText className="select-input-error-text">
          {errors?.beneficiaries?.[index]?.phone?.message}

          <br />
        </IonText>
      )}
      {/* <Controller
        name={`beneficiaries.${index}.phone`}
        control={control}
        defaultValue={field?.phone || ""}
        render={({ field }) => (
          <TextInputField
            placeholder="Enter Phone"
            type="number"
            label="Phone*"
            value={getValues(`beneficiaries.${index}.phone`)}
            errorText={errors?.beneficiaries?.[index]?.phone?.message}
            onInput={(e) => {
              setValue(`beneficiaries.${index}.phone`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
            isSubmitted={isSubmitted}
          />
        )}
        rules={{
          required: "Please enter phone number",
          // minLength: {
          //   value: 10,
          //   message: "Phone Number must be of 10 digits",
          // },
          // maxLength: {
          //   value: 10,
          //   message: "Phone Number must be of 10 digits",
          // },
        }}
      /> */}
      <br />

      <Controller
        name={`beneficiaries.${index}.gender`}
        control={control}
        defaultValue={field?.gender || ""}
        render={({ field }) => (
          <FormInputSelect
            label="Gender*"
            placeholder="Select Gender"
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
            <IonSelectOption value="MALE">Male</IonSelectOption>
            <IonSelectOption value="FEMALE">Female</IonSelectOption>
            <IonSelectOption value="OTHERS">Others</IonSelectOption>
          </FormInputSelect>
        )}
        rules={{
          required: "Please select gender",
        }}
      />

      <br />
      <Controller
        name={`beneficiaries.${index}.estimatedAge`}
        control={control}
        defaultValue={field?.estimatedAge || ""}
        render={({ field }) => (
          <FormInputSelect
            label="Estimated Age*"
            placeholder="Select Estimated Age"
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
          required: "Please select estimated age",
        }}
      />
      <br />
      <Controller
        name={`beneficiaries.${index}.address`}
        control={control}
        defaultValue={field?.address || ""}
        render={({ field }) => (
          <TextInputField
            placeholder="Enter Address"
            type="text"
            label="Address"
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
