import TextInputField from "@components/input/form-text-input";
import PhoneCodeSelector from "@components/modals/phoneCodeSelector";
import { IonIcon, IonImg, IonInput, IonModal } from "@ionic/react";
import { SelectOptionItem } from "@sections/auth/registration";
import useAppStore from "@store/app";
import { caretDownOutline, searchOutline } from "ionicons/icons";
import { FC, useEffect, useRef } from "react";

type Props = any;

const CountryCodeInput: FC<Props> = ({
  getValues,
  setValue,
  setError,
  clearInput,
  onBlur,
  placeholder,
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

  //  useEffect(() => {
  //    const phone = getValues("phone");
  //    const code = getValues("code");
  //
  //    if (phone && code) {
  //      setValue("fullPhone", `${code}${phone}`);
  //    }
  //  }, [getValues, setValue]);

  return (
    <>
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
        />
      </div>
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
            console.log("here");
            phoneCodeModal.current?.dismiss();
          }}
        />
      </IonModal>
    </>
  );
};

export default CountryCodeInput;
