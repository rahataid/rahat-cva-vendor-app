import TextInputField from "@components/input/form-text-input";
import PhoneCodeSelector from "@components/modals/phoneCodeSelector";
import {
  IonCol,
  IonIcon,
  IonImg,
  IonInput,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { SelectOptionItem } from "@sections/auth/registration";
import useAppStore from "@store/app";
import { caretDownOutline, searchOutline, watch } from "ionicons/icons";
import { FC, useEffect, useRef } from "react";
import "./countryCodeInput.scss";

type Props = any;

const CountryCodeInput: FC<Props> = ({
  watch,
  errorText,
  errors,
  getValues,
  setValue,
  setError,
  clearInput,
  onBlur,
  placeholder,
  modalId,
  trigger,
  isoValue,
  codeValue,
  phoneValue,
}) => {
  const { countries } = useAppStore();
  const phoneCodeModal = useRef<HTMLIonModalElement>(null);
  const phoneCodeOptions: SelectOptionItem[] | undefined = countries?.map(
    (it) => ({
      text: `${it.name} (${it.phoneCode})`,
      value: it.phoneCode,
      iso: it.iso,
      id: it.id,
    })
  );

  useEffect(() => {
    setValue("fullPhone", `${codeValue}${phoneValue}`);
  }, [codeValue, phoneValue, setValue]);

  useEffect(() => {
    // trigger();
    console.log(codeValue, phoneValue, getValues("fullPhone"));
    console.log(errors);
  });

  return (
    <>
      <IonRow>
        <IonCol size="4" className="ion-no-padding">
          <div className="wrapper-input">
            {isoValue ? (
              <IonImg
                src={`assets/flags/small/${isoValue?.toLocaleLowerCase()}.svg`}
              />
            ) : (
              <IonImg
                className="default-flag"
                src={`assets/flags/small/default.jpg`}
              />
            )}
            <TextInputField
              id="select-phoneCode"
              hasCountryFlag={true}
              rightIcon={caretDownOutline}
              rightIconClick={() => phoneCodeModal.current?.present()}
              clearInput={clearInput}
              onBlur={onBlur}
              placeholder={placeholder}
              value={codeValue}
            />
          </div>
        </IonCol>
        <IonCol size="0.1" className="ion-no-padding"></IonCol>
        <IonCol className="ion-no-padding">
          <TextInputField
            placeholder="Enter phone number"
            type="number"
            value={phoneValue}
            onInput={(e: any) => {
              setValue("phone", e.target.value, {
                shouldValidate: true,
              });
              trigger("fullPhone");
            }}
            onBlur={() => {
              onBlur;
              trigger("fullPhone");
            }}
          />
        </IonCol>
      </IonRow>
      <IonText>
        <p className="country-code-error-msg">{errorText}</p>
      </IonText>

      <IonModal
        trigger="select-phoneCode"
        ref={phoneCodeModal}
        canDismiss={true}
      >
        <PhoneCodeSelector
          title="Choose your country Code"
          searchPlaceholder="Enter country code"
          items={phoneCodeOptions || []}
          selectedItem={codeValue}
          onSelectionCancel={() => phoneCodeModal.current?.dismiss()}
          onSelectionChange={(el: any) => {
            setValue("code", el.value, { shouldValidate: true });
            setValue("iso", el.iso, { shouldValidate: true });
            setError("root", {});
            setError("fullPhone", {});
            phoneCodeModal.current?.dismiss();
          }}
        />
      </IonModal>
    </>
  );
};

export default CountryCodeInput;
