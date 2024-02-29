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
          <IonButton
            color="danger"
            fill="clear"
            size="small"
            onClick={handleRemove}
          >
            <IonIcon icon={removeCircleOutline} />
          </IonButton>
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
          required: "Please enter Phone number",
          minLength: {
            value: 7,
            message: "Phone Number must be at least 7 digits",
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
          <TextInputField
            placeholder="Enter Age"
            type="number"
            label="Estimated Age*"
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
          required: "Please enter Estimated age",
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
