import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonButton, IonCardContent, IonIcon, IonText } from "@ionic/react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReferSection from "./refer-section";
import { add, addOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const DynamicForm = () => {
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, isDirty, isLoading, errors },
    getValues,
    setValue,
    trigger,
  } = useForm({
    mode: "all",
    defaultValues: {
      beneficiaries: [
        { name: "", phone: "", gender: "", estimatedAge: "", address: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiaries",
    // Set max length to 3
    max: 3,
  });

  const onSubmit = (data) => {
    console.log(data, "DATA ========>");
    history.push("/refer-success");
  };

  const handleRemove = (index: number) => {
    if (index > 0) remove(index);
  };

  // useEffect(() => {
  //   console.log("IS SUBMITTED", isSubmitted);
  //   console.log(fields, fields[0].name, "uSEEFFECT NAME");
  //   if (errors?.beneficiaries?.length)
  //     console.log(
  //       errors,
  //       "ERRORS DYNAMIC FIELD",
  //       errors?.beneficiaries[0]?.name?.message,
  //       errors?.beneficiaries[0]?.phone?.message
  //     );
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TransparentCard>
        <IonCardContent>
          {fields.map((field, index) => (
            <div key={field.id}>
              <ReferSection
                index={index}
                getValues={getValues}
                setValue={setValue}
                control={control}
                formState={{ isSubmitted, errors }}
                handleRemove={() => handleRemove(index)}
                remove={remove}
              />
            </div>
          ))}
          {errors?.beneficiaries?.length && isSubmitted && (
            <IonText color="danger">
              Please fill in all required fields correctly.
            </IonText>
          )}

          <IonButton
            fill="outline"
            color="primary"
            onClick={() =>
              append({
                name: "",
                phone: "",
                gender: "",
                estimatedAge: "",
                address: "",
              })
            }
            disabled={fields.length >= 3}
          >
            <IonIcon icon={add} />
            Add More
          </IonButton>

          <br />
          <br />
          <IonButton expand="block" type="submit" disabled={isLoading}>
            Submit
          </IonButton>
        </IonCardContent>
      </TransparentCard>
    </form>
  );
};

export default DynamicForm;
