import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import "./text-input.scss";

interface TextInputFieldProps {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  isRequired?: boolean;
  label?: string;
  labelPlacement?: "fixed" | "start" | "end" | "floating" | "stacked";
  rows?: number;
  clearOnEdit?: boolean;
  clearInput?: boolean;
  placeholder?: string;
  value?: string;
  helperText?: string;
  errorText?: string;
  onChange?: any;
  onInput?: any;
  onBlur?: any;
  onFocous?: any;
  additionalClass?: string;
  style?: {};
  inputStyle?: {};
  disabled?: boolean;
  id?: string | undefined;
  rightIcon?: string;
  rightIconClick?: any;
}

const TextInputFieldMultiLine: React.FC<TextInputFieldProps> = forwardRef(
  (
    {
      isRequired = false,
      label = "",
      clearInput = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isTouched, setIsTouched] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useImperativeHandle(ref, () => ({
      alertMessge: () => {
        alert("Hello world");
      },
    }));

    // const validate = (ev: Event) => {
    //   const value = (ev.target as HTMLInputElement).value;

    //   // if (value === '') return;

    //   value !== null || value === '' ? setHasValue(true) : setHasValue(false);
    // };

    const markTouched = () => {
      setIsTouched(true);
    };

    return (
      <div className={`${props.additionalClass} text-input-container`}>
        {label && <IonLabel className={`text-input-label`}>{label}</IonLabel>}
        <IonTextarea
          id={props.id}
          type={props.type}
          // label={label}
          labelPlacement={props.labelPlacement}
          placeholder={props.placeholder}
          value={props.value}
          helperText={props.helperText}
          errorText={props.errorText}
          onIonChange={props.onChange}
          onIonInput={props.onInput}
          onIonFocus={props.onFocous}
          onIonBlur={() => {
            markTouched();
            props.onBlur;
          }}
          clearOnEdit={props.clearOnEdit}
          disabled={disabled}
          clearInput={clearInput}
          mode="md"
          fill="outline"
          // onIonInput={(e) => validate(e)}
          style={props.inputStyle}
          className={`text-input ${isTouched && "ion-touched"} ${
            props.errorText ? "ion-invalid" : "ion-valid"
          } ${disabled && "text-input-disabled"}`}
          {...props}
        />

        {props.rightIcon && (
          <IonIcon
            icon={props.rightIcon}
            className={`text-input-icon ${
              props.type == "password" ? "text-input-password-icon" : ""
            }`}
            onClick={props.rightIconClick}
          />
        )}
      </div>
    );
  }
);

export default TextInputFieldMultiLine;
