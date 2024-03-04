// ReferSection.jsx
import CustomDivider from "@components/divider";
import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { removeCircleOutline } from "ionicons/icons";
import { Controller, useFormState } from "react-hook-form";
import "./refer-beneficiaries.scss";
import FormInputSelect from "@components/input/form-select-input";

const ReferSection = ({
  index,
  getValues,
  setValue,
  field,
  control,
  formState: { isSubmitted, errors },
  handleRemove,
  remove,
}: any) => {
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
      <Controller
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
          minLength: {
            value: 10,
            message: "Phone Number must be at least 10 digits",
          },
        }}
      />
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
