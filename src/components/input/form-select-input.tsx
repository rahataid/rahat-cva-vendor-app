import { IonLabel, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import "./text-input.scss";

const FormInputSelect: React.FC<any> = forwardRef(
  (
    {
      isRequired = false,
      label = "",
      clearInput = true,
      disabled = false,
      isSubmitted = false,
      labelPlacement = "stacked",
      fill = "outline",
      mode = "md",
      interfaceType = "popover",
      children,
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
      <div style={{ ...props.style }}>
        {label && (
          <>
            <IonLabel className={`text-input-label`}>{label}</IonLabel>
          </>
        )}
        <IonSelect
          labelPlacement={labelPlacement}
          fill={fill}
          mode={mode}
          interface={interfaceType}
          justify="space-between"
          placeholder={props.placeholder}
          value={props.value}
          //   className={
          //     props.errorText ? "ion-select-invalid" : "ion-select-valid"
          //   }
          className={`select-input ${
            (isTouched || isSubmitted) && "ion-touched"
          }  ${props.errorText ? "ion-select-invalid" : "ion-select-valid"} ${
            disabled && "text-input-disabled"
          }`}
          onIonChange={props.onChange}
          onBlur={() => {
            markTouched();
            props.onBlur;
          }}
          disabled={disabled}
          style={props.inputStyle}
          {...props}
        >
          {children}
        </IonSelect>
        {props.errorText && (
          <>
            <IonText className="select-input-error-text">
              {props.errorText}
            </IonText>
          </>
        )}
      </div>
    );
  }
);

export default FormInputSelect;
