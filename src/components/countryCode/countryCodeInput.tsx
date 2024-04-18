import TextInputField from "@components/input/form-text-input";
import PhoneCodeSelector from "@components/modals/phoneCodeSelector";
import { IonCol, IonImg, IonModal, IonRow, IonText } from "@ionic/react";
import { SelectOptionItem } from "@sections/auth/registration";
import useAppStore from "@store/app";
import { caretDownOutline, searchOutline, watch } from "ionicons/icons";
import { FC, useEffect, useRef } from "react";
import "./countryCodeInput.scss";

type Props = any;

const CountryCodeInput: FC<Props> = ({
  errorText,
  clearInput,
  onPhoneBlur,
  codePlaceholder,
  phonePlaceholder,
  modalId,
  isoValue,
  codeValue,
  phoneValue,
  onModalSelectionChange,
  onPhoneChange,
  combineInputs,
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
    combineInputs();
  }, [codeValue, phoneValue]);

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
              id={modalId}
              hasCountryFlag={true}
              rightIcon={caretDownOutline}
              rightIconClick={() => phoneCodeModal.current?.present()}
              clearInput={clearInput}
              onBlur={onPhoneBlur}
              placeholder={codePlaceholder}
              value={codeValue}
            />
          </div>
        </IonCol>
        <IonCol size="0.1" className="ion-no-padding"></IonCol>
        <IonCol className="ion-no-padding">
          <TextInputField
            placeholder={phonePlaceholder}
            type="number"
            value={phoneValue}
            onInput={(e: any) => {
              console.log(e.target.value);
              onPhoneChange(e);
            }}
            onBlur={() => {
              onPhoneBlur();
            }}
          />
        </IonCol>
      </IonRow>
      <IonText className="country-code-error-msg">{errorText}</IonText>

      <IonModal trigger={modalId} ref={phoneCodeModal} canDismiss={true}>
        <PhoneCodeSelector
          title="Choose your country Code"
          searchPlaceholder="Enter country code"
          items={phoneCodeOptions || []}
          selectedItem={codeValue}
          onSelectionCancel={() => phoneCodeModal.current?.dismiss()}
          onSelectionChange={(el: any) =>
            onModalSelectionChange(el, phoneCodeModal)
          }
        />
      </IonModal>
    </>
  );
};

export default CountryCodeInput;