import TextInputField from "@components/input/form-text-input";
import {
  IonCol,
  IonImg,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { Controller } from "react-hook-form";
import { validateWalletAddress } from "../../utils/web3";
import PhoneCodeSelector from "../../components/modals/phoneCodeSelector";
import { caretDownOutline } from "ionicons/icons";
import { useRef } from "react";
import { SelectOptionItem } from "../auth/registration";
import useAppStore from "../../store/app";

const ChargePhone = ({
  getValues,
  errors,
  setValue,
  control,
  setError,
}: any) => {
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
  return (
    <>
      <br />
      <IonText>
        <p>Please enter phone number of the beneficiary.</p>
      </IonText>
      <br />
      <div className="ion-margin-top-sm">
        <IonLabel class={`text-input-label`}>Phone Number*</IonLabel>
      </div>
      <IonRow>
        <IonCol size="4" class="ion-no-padding">
          <div className="wrapper-input">
            {getValues("iso") && (
              <IonImg
                src={`assets/flags/small/${getValues(
                  "iso"
                )?.toLocaleLowerCase()}.svg`}
                data-testid="registraton_form_image_flags"
              />
            )}

            <TextInputField
              id="select-phoneCode"
              clearInput={false}
              value={getValues("code")}
              additionalClass=""
              placeholder="0000"
              rightIcon={caretDownOutline}
              hideRightIconBG
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
                setValue("countryId", el.id, { shouldValidate: true });
                setError("root", {});
                phoneCodeModal.current?.dismiss();
              }}
              data-testid="registration_form_selector_phone_code"
            />
          </IonModal>
        </IonCol>
        <IonCol size="0.1" class="ion-no-padding"></IonCol>
        <IonCol class="ion-no-padding">
          <Controller
            render={({ field }) => (
              <TextInputField
                placeholder="Enter phone number"
                type="number"
                value={getValues("phone")}
                errorText={errors?.phone?.message}
                onInput={(e: any) => {
                  setValue("phone", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={field.onBlur}
              />
            )}
            rules={{
              required: "Please enter valid phone number",
              // validate: {
              //   validateInput: (value) =>
              //     (validateWalletAddress(value) && value.length === 42) ||
              //     (value.length === 10 && !isNaN(value)) ||
              //     "Please enter a valid phone number or wallet address",
              // },
              // validate: validateWalletAddress,
              // minLength: {
              //   value: 10,
              //   message: "Phone Number must be of 10 digits",
              // },
              // maxLength: {
              //   value: 10,
              //   message: "Phone Number must be of 10 digits",
              // },
            }}
            control={control}
            name="phone"
          />
        </IonCol>
      </IonRow>
      {errors?.root?.serverError?.message && (
        <>
          <br />
          <IonText color="danger">{errors?.root?.serverError.message}</IonText>
        </>
      )}
      <br />
    </>
  );
};

export default ChargePhone;
