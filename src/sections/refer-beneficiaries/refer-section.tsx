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
  IonText,
} from "@ionic/react";
import { removeCircleOutline } from "ionicons/icons";
import { Controller, useFormState } from "react-hook-form";
import "./refer-beneficiaries.scss";

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
      <IonRow>
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
            placeholder="Phone"
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
          <TextInputField
            placeholder="gender"
            type="text"
            label="Gender*"
            value={getValues(`beneficiaries.${index}.gender`)}
            errorText={errors?.beneficiaries?.[index]?.gender?.message}
            onInput={(e) => {
              setValue(`beneficiaries.${index}.gender`, e.target.value, {
                shouldValidate: true,
              });
            }}
            onBlur={field?.onBlur}
            isSubmitted={isSubmitted}
          />
        )}
        rules={{
          required: "Please enter Gender",
        }}
      />
      <br />
      <Controller
        name={`beneficiaries.${index}.estimatedAge`}
        control={control}
        defaultValue={field?.estimatedAge || ""}
        render={({ field }) => (
          <TextInputField
            placeholder="estimatedAge"
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
            placeholder="address"
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
