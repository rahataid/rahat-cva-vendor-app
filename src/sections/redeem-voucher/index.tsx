import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import TextInputField from "@components/input/form-text-input";
import TextInputFieldMultiLine from "@components/input/form-text-input-multiline";
import InputSelect from "@components/select/form-select-input";
import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";

import "./redeem-voucher.scss";
import CustomChip from "@components/chip/customChip";
import BeneficiaryDetails from "./beneficiary-details";
import { SelectInputOptions } from "../../types/chargeBeneficiary";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { VOUCHER } from "@types/beneficiaries";
import { homeOutline } from "ionicons/icons";

const options: SelectInputOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const RedeemVoucher: React.FC = () => {
  const history = useHistory();
  let voucherType: VOUCHER = VOUCHER.FREE_VOUCHER;
  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      status: "",
    },
  });
  const handleRefer = () => {
    history.push("/refer-beneficiaries");
  };
  const handleGoHome = () => {
    history.push("/tabs/home");
  };
  const onSubmit = (data: any) => {
    try {
      console.log(data);
      history.push("/otp");
    } catch (error: any) {
      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
            <TransparentCard>
              <IonCardContent>
                <div>
                  <IonGrid className="p-0">
                    <IonRow>
                      <IonCol size="6" className="pl-0">
                        Beneficiary Name:
                      </IonCol>
                      <IonCol size="6" className="pr-0">
                        Mani Byanjankar
                      </IonCol>
                      <IonCol size="6" className="pl-0">
                        Voucher Type:
                      </IonCol>
                      <IonCol size="6" className="pr-0">
                        {(voucherType === VOUCHER.DISCOUNT_VOUCHER && (
                          <CustomChip
                            color="success"
                            label="Discount Voucher"
                          />
                        )) ||
                          (voucherType === VOUCHER.FREE_VOUCHER && (
                            <CustomChip color="warning" label="Free Voucher" />
                          ))}
                      </IonCol>
                      {/* <IonLabel class={`text-input-label`}>
                        {"Select Status:"}
                      </IonLabel> */}
                      Status:
                      <Controller
                        render={({ field }) => (
                          <IonSelect
                            labelPlacement="stacked"
                            fill="outline"
                            placeholder="Select Status"
                            mode="md"
                            interface="popover"
                            justify="space-between"
                            className={
                              errors?.status?.message
                                ? "ion-select-invalid"
                                : "ion-select-valid"
                            }
                            onIonChange={(e) => {
                              setValue("status", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                            onBlur={field.onBlur}
                          >
                            <IonSelectOption value="GLASSES_REQUIRED">
                              Glasses required
                            </IonSelectOption>
                            <IonSelectOption value="GLASSES_NOT_REQUIRED">
                              Glasses not required
                            </IonSelectOption>
                          </IonSelect>
                        )}
                        rules={{
                          required: "Please select the status",
                        }}
                        control={control}
                        name="status"
                      />
                      {
                        <IonText className="select-input-error-text">
                          {errors?.status?.message}
                        </IonText>
                      }
                    </IonRow>
                    <br />
                    <IonRow>
                      {voucherType === "DISCOUNT_VOUCHER" ? (
                        <IonCol size="12" className="pl-0">
                          <IonButton
                            type="submit"
                            mode="md"
                            expand="block"
                            color="primary"
                            disabled={
                              !isValid ||
                              isSubmitting ||
                              getValues("status") === "GLASSES_NOT_REQUIRED"
                            }
                          >
                            Redeem Voucher
                          </IonButton>
                        </IonCol>
                      ) : (
                        <>
                          <IonCol
                            sizeXs="6"
                            sizeSm="6"
                            size="6"
                            className="pl-0"
                          >
                            <IonButton
                              type="submit"
                              mode="md"
                              expand="block"
                              color="primary"
                              disabled={
                                !isValid ||
                                isSubmitting ||
                                getValues("status") === "GLASSES_NOT_REQUIRED"
                              }
                            >
                              Redeem Voucher
                            </IonButton>
                          </IonCol>
                          <IonCol
                            sizeXs="6"
                            sizeSm="6"
                            size="6"
                            className="pr-0"
                          >
                            <IonButton
                              mode="md"
                              expand="block"
                              color="warning"
                              onClick={handleRefer}
                            >
                              Refer
                            </IonButton>
                          </IonCol>
                        </>
                      )}

                      <br />
                      <br />
                      <IonCol sizeSm="12" sizeMd="12" className="px-0">
                        <IonButton
                          onClick={handleGoHome}
                          expand="block"
                          fill="outline"
                        >
                          <IonIcon slot="start" icon={homeOutline} />
                          Go To Homepage
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonCardContent>
            </TransparentCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default RedeemVoucher;
