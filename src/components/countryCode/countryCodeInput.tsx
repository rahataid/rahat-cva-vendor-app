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
  trigger,
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

  const code = watch("code");
  const phone = watch("phone");
  useEffect(() => {
    setValue("fullPhone", `${code}${phone}`);
  }, [code, phone, setValue]);

  useEffect(() => {
    // trigger();
    console.log(getValues("code"), getValues("phone"), getValues("fullPhone"));
    console.log(errors);
  });

  return (
    <>
      <IonRow>
        <IonCol size="4" className="ion-no-padding">
          <div className="wrapper-input">
            {getValues("iso") ? (
              <IonImg
                src={`assets/flags/small/${getValues(
                  "iso"
                )?.toLocaleLowerCase()}.svg`}
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
              value={getValues("code")}
            />
          </div>
        </IonCol>
        <IonCol size="0.1"></IonCol>
        <IonCol className="ion-no-padding">
          <TextInputField
            placeholder="Enter phone number"
            type="number"
            value={getValues("phone")}
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
          selectedItem={getValues("code")}
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
