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
import CustomDivider from "@components/divider";

const options: SelectInputOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const RedeemVoucher: React.FC = ({ data }: any) => {
  const history = useHistory();
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
  const handleRedeem = () => {
    history.push("/otp", { data });
  };
  const handleRefer = () => {
    history.push("/refer-beneficiaries");
  };
  const handleGoHome = () => {
    history.push("/tabs/home");
  };
  const onSubmit = (data: any) => {
    try {
      console.log(data);
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
                        {data?.name || "-"}
                      </IonCol>
                      <IonCol size="6" className="pl-0">
                        Voucher Type:
                      </IonCol>
                      <IonCol size="6" className="pr-0">
                        {(data?.voucherType === VOUCHER.DISCOUNT_VOUCHER && (
                          <IonText color="success">Discount Voucher</IonText>
                        )) ||
                          (data?.voucherType === VOUCHER.FREE_VOUCHER && (
                            <IonText color="warning">Free Voucher</IonText>
                          ))}
                      </IonCol>
                      {/* <IonLabel class={`text-input-label`}>
                        {"Select Status:"}
                      </IonLabel> */}
                      <IonText style={{ marginTop: "5px" }}>Status:</IonText>
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
                            {data?.voucherType === VOUCHER.FREE_VOUCHER ? (
                              <>
                                <IonSelectOption value="GLASSES_REQUIRED">
                                  Checked, Glasses Required
                                </IonSelectOption>
                                <IonSelectOption value="GLASSES_NOT_REQUIRED">
                                  Checked, Glasses Not Required
                                </IonSelectOption>
                              </>
                            ) : (
                              <>
                                <IonSelectOption value="GLASSES_BOUGHT">
                                  Glasses Bought
                                </IonSelectOption>
                                <IonSelectOption value="GLASSES_NOT_BOUGHT">
                                  Glasses Not Bought
                                </IonSelectOption>
                              </>
                            )}
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

                      <IonCol
                        size="12"
                        className="px-0"
                        style={{ marginTop: "10px" }}
                      >
                        <IonButton
                          type="submit"
                          mode="md"
                          expand="block"
                          color="primary"
                          disabled={!isValid || isSubmitting}
                        >
                          Save Status
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <br />
                    <CustomDivider />
                    <br />
                    <IonRow>
                      {data?.voucherType === "DISCOUNT_VOUCHER" ? (
                        <IonCol size="12" className="px-0">
                          <IonButton
                            mode="md"
                            expand="block"
                            color="success"
                            disabled={
                              !isValid ||
                              isSubmitting ||
                              getValues("status") === "GLASSES_NOT_REQUIRED" ||
                              getValues("status") === "GLASSES_NOT_BOUGHT"
                            }
                            onClick={handleRedeem}
                          >
                            Redeem Voucher
                          </IonButton>
                        </IonCol>
                      ) : (
                        <>
                          <IonCol size="12" className="px-0">
                            <IonButton
                              mode="md"
                              expand="block"
                              color="success"
                              disabled={
                                !isValid ||
                                isSubmitting ||
                                getValues("status") ===
                                  "GLASSES_NOT_REQUIRED" ||
                                getValues("status") === "GLASSES_NOT_BOUGHT"
                              }
                              onClick={handleRedeem}
                            >
                              Redeem Voucher
                            </IonButton>
                          </IonCol>

                          <IonCol size="12" className="px-0">
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

                      {data?.voucherType === VOUCHER.DISCOUNT_VOUCHER && (
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
                      )}
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
