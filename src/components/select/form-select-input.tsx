import { IonLabel, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import React from "react";
import "./select-input.scss";

type Options = {
  value: string;
  label: string;
};
type SelectFieldProps = {
  additionalClass?: string;
  disabled?: boolean;
  errorText?: string;
  inputStyle?: {};
  isRequired?: boolean;
  label?: string;
  labelPlacement?: "fixed" | "start" | "end" | "floating" | "stacked";
  options: Options[];
  onChange?: any;
  onInput?: any;
  onBlur?: any;
  onFocus?: any;
  placeholder?: string;
  style?: {};
  value?: string;
};

const InputSelect: React.FC<SelectFieldProps> = forwardRef(
  (
    {
      disabled = false,
      isRequired = false,
      label = "",
      labelPlacement = "stacked",
      ...props
    },
    ref
  ) => {
    const [isTouched, setIsTouched] = useState(false);
    useImperativeHandle(ref, () => ({
      alertMessge: () => {
        alert("Hello world");
      },
    }));
    const markTouched = () => {
      setIsTouched(true);
    };

    return (
      <div className={`${props.additionalClass} select-input-container`}>
        {label && <IonLabel className={`select-input-label`}>{label}</IonLabel>}
        <IonSelect
          fill="outline"
          labelPlacement={labelPlacement}
          placeholder={props.placeholder}
          // value={props.value}
          onIonBlur={() => {
            markTouched();
            props.onBlur;
          }}
          onIonChange={props.onInput}
          className={`select-input ${isTouched && "ion-touched"} ${
            props.errorText ? "ion-invalid" : "ion-valid"
          } ${disabled && "select-input-disabled"}`}
        >
          {props?.options?.map((option, index) => (
            <IonSelectOption key={index} value={option.value}>
              {option.label}
            </IonSelectOption>
          ))}
        </IonSelect>
        <div className="input-bottom sc-ion-input-md">
          <div className="helper-text sc-ion-input-md"></div>
          <div className="error-text sc-ion-input-md st-current">
            Please enter age
          </div>
        </div>
        <IonText>
          <p className="select-error-msg">{props.errorText}</p>
        </IonText>
      </div>
    );
  }
);

export default InputSelect;
