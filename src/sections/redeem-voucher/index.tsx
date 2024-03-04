import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonSelectOption,
  IonText,
} from "@ionic/react";

import "./redeem-voucher.scss";
import { SelectInputOptions } from "../../types/chargeBeneficiary";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { VOUCHER } from "@types/beneficiaries";
import { homeOutline } from "ionicons/icons";
import CustomDivider from "@components/divider";
import FormInputSelect from "@components/input/form-select-input";
import { useState } from "react";

const RedeemVoucher: React.FC = ({ data }: any) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
      eyeCheckupStatus: "",
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
  const handleInputChange = () => {
    setSubmitSuccess(false);
  };
  const onSubmit = (data: any) => {
    try {
      console.log(data);
      setSubmitSuccess(true);
      // throw new Error("ERORR");
    } catch (error: any) {
      setSubmitSuccess(false);
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
                  </IonRow>
                  <div className="gap-5"></div>
                  {data?.voucherType === VOUCHER.DISCOUNT_VOUCHER && (
                    <Controller
                      render={({ field }) => (
                        <FormInputSelect
                          label="Eye Checkup Status:"
                          placeholder="Select Status"
                          onChange={(e) => {
                            setValue("eyeCheckupStatus", e.target.value, {
                              shouldValidate: true,
                            });
                            handleInputChange();
                          }}
                          onBlur={field.onBlur}
                          errorText={errors?.eyeCheckupStatus?.message}
                        >
                          <IonSelectOption value="EYE_CHECKUP_DONE">
                            Checkup Done
                          </IonSelectOption>
                          <IonSelectOption value="EYE_CHECKUP_NOT_DONE">
                            Checkup Not Done
                          </IonSelectOption>
                        </FormInputSelect>
                      )}
                      rules={{
                        required: "Please select the status",
                      }}
                      control={control}
                      name="eyeCheckupStatus"
                    />
                  )}
                  <div className="gap-5"></div>
                  <div className="gap-5"></div>
                  <Controller
                    render={({ field }) => (
                      <FormInputSelect
                        label="Glasses Status:"
                        placeholder="Select Status"
                        onChange={(e) => {
                          setValue("status", e.target.value, {
                            shouldValidate: true,
                          });
                          handleInputChange();
                        }}
                        onBlur={field.onBlur}
                        errorText={errors?.status?.message}
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
                      </FormInputSelect>
                    )}
                    rules={{
                      required: "Please select the status",
                    }}
                    control={control}
                    name="status"
                  />
                  <div className="gap-5"></div>
                  <div className="gap-5"></div>
                  <div className="gap-5"></div>
                  <IonCol size="12" className="px-0">
                    {submitSuccess && (
                      <IonText color="success">
                        Status saved successfully!
                      </IonText>
                    )}
                    {errors?.root?.serverError?.message && (
                      <IonText color="danger">
                        {errors?.root?.serverError.message}
                      </IonText>
                    )}
                  </IonCol>
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
                              getValues("status") === "GLASSES_NOT_REQUIRED" ||
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
              </IonCardContent>
            </TransparentCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default RedeemVoucher;
