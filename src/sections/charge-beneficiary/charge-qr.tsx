import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  isPlatform,
} from "@ionic/react";
import { Controller } from "react-hook-form";
import { validateWalletAddress } from "../../utils/web3";
import { qrCodeOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const ChargeQr = ({ getValues, errors, setValue, control }: any) => {
  const { t } = useTranslation();
  const history = useHistory();
  const isPlatformWeb = isPlatform("mobileweb") || isPlatform("desktop");
  const handleScanClick = () => {
    history.push("/scanner", {
      data: { redirectTo: "/tabs/charge-beneficiary" },
    });
  };
  return (
    <>
      <br />
      <IonText>
        <p>{t("CHARGE_BENEFICIARY_PAGE.SEGMENTS.WALLET.DESCRIPTION")}</p>
      </IonText>
      <br />
      <IonRow>
        {isPlatformWeb ? (
          <>
            <IonCol size="12" class="ion-no-padding">
              <Controller
                render={({ field }) => (
                  <TextInputField
                    label={t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.WALLET.LABELS.WALLET_ADDRESS"
                    )}
                    placeholder={t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.WALLET.PLACEHOLDERS.WALLET_ADDRESS"
                    )}
                    type="text"
                    value={getValues("walletAddress")}
                    errorText={errors?.walletAddress?.message}
                    onInput={(e: any) => {
                      setValue("walletAddress", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    onBlur={field.onBlur}
                  />
                )}
                rules={{
                  required: t("GLOBAL.ERRORS.INVALID_WALLET_ADDRESS"),
                  validate: {
                    validateInput: (value) =>
                      (validateWalletAddress(value) && value.length === 42) ||
                      t("GLOBAL.ERRORS.INVALID_WALLET_ADDRESS"),
                  },
                }}
                control={control}
                name="walletAddress"
              />
            </IonCol>
          </>
        ) : (
          <>
            <IonCol size="10" class="ion-no-padding">
              <Controller
                render={({ field }) => (
                  <TextInputField
                    label={t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.WALLET.LABELS.WALLET_ADDRESS"
                    )}
                    placeholder={t(
                      "CHARGE_BENEFICIARY_PAGE.SEGMENTS.WALLET.PLACEHOLDERS.WALLET_ADDRESS"
                    )}
                    type="text"
                    value={getValues("walletAddress")}
                    errorText={errors?.walletAddress?.message}
                    onInput={(e: any) => {
                      setValue("walletAddress", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    onBlur={field.onBlur}
                  />
                )}
                rules={{
                  required: t("GLOBAL.ERRORS.IVALID_WALLET_ADDRESS"),
                  validate: {
                    validateInput: (value) =>
                      (validateWalletAddress(value) && value.length === 42) ||
                      t("GLOBAL.ERRORS.IVALID_WALLET_ADDRESS"),
                  },
                }}
                control={control}
                name="walletAddress"
              />
            </IonCol>
            <IonCol size="0.1" class="ion-no-padding"></IonCol>
            <IonCol size="1" class="ion-no-padding">
              <IonButton
                fill="solid"
                className="scan-btn"
                onClick={handleScanClick}
              >
                <IonIcon slot="icon-only" icon={qrCodeOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </>
        )}
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

export default ChargeQr;
