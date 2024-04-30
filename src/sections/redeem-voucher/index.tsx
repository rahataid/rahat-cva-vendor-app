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
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import { homeOutline } from "ionicons/icons";
import CustomDivider from "@components/divider";
import FormInputSelect from "@components/input/form-select-input";
import { FC, useState } from "react";
import useTransactionStore from "@store/transaction";
import CustomToast from "@components/toast";
import useCustomToast from "@hooks/use-custom-toast";
import useVoucherType from "@hooks/use-voucher-type";
import { cropString } from "../../utils/helperFunctions";
import { useTranslation } from "react-i18next";
import CustomLoader from "@components/loaders/customLoader";
import { handleError } from "@utils/errorHandler";
import { MAX_REFERALS } from "@constants/values";

type Props = {
  beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
  beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
};

const RedeemVoucher: FC<Props> = ({
  beneficiaryVoucher,
  beneficiaryDetails,
}) => {
  const { t } = useTranslation();
  const { toastVisible, toastMessage, toastColor, showToast, hideToast } =
    useCustomToast();
  const { redeemVoucher, updateStatus } = useTransactionStore((state) => ({
    redeemVoucher: state.redeemVoucher,
    updateStatus: state.updateStatus,
  }));
  const { voucherType, isVoucherClaimed } = useVoucherType(beneficiaryVoucher);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();
  const isMaxReferred =
    +beneficiaryDetails?.beneficiariesReferred >= MAX_REFERALS;
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
      glassesStatus: beneficiaryDetails?.glassesStatus || "",
      eyeCheckupStatus: beneficiaryDetails?.eyeCheckupStatus || "",
    },
  });

  const handleUpdateStatus = async () => {
    setInProgress(true);
    try {
      const eyeCheckUp =
        getValues("eyeCheckupStatus") === "EYE_CHECKUP_DONE" ? true : false;
      const glassStatus =
        getValues("glassesStatus") === "GLASSES_BOUGHT" ||
        getValues("glassesStatus") === "GLASSES_REQUIRED"
          ? true
          : false;
      let updateRes;
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        updateRes = await updateStatus({
          voucherType,
          beneficiary: beneficiaryDetails,
          eyeCheckUp,
          glassStatus,
        });
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        updateRes = await updateStatus({
          voucherType,
          beneficiary: beneficiaryDetails,
          referralVoucherAddress: beneficiaryVoucher?.ReferredVoucherAddress,
          eyeCheckUp,
          glassStatus,
        });
      }
      // showToast("Status Updated Successfully", "success");
      setSubmitSuccess(true);
      setError("root.serverError", {
        type: "manual",
        message: "",
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
      history.push("/update-status-result", {
        data: {
          beneficiaryVoucher,
          beneficiaryDetails,
          updateRes,
        },
      });
    } catch (error) {
      showToast(handleError(error), "danger");
      setSubmitSuccess(false);
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
    setInProgress(false);
  };

  const handleRedeemVoucher = async () => {
    setInProgress(true);
    try {
      const eyeCheckUp =
        getValues("eyeCheckupStatus") === "EYE_CHECKUP_DONE" ? true : false;
      const glassStatus =
        getValues("glassesStatus") === "GLASSES_BOUGHT" || "GLASSES_REQUIRED"
          ? true
          : false;
      let redeemRes;
      if (voucherType === VOUCHER.FREE_VOUCHER)
        redeemRes = await redeemVoucher({
          beneficiary: beneficiaryDetails,
          voucherType: VOUCHER.FREE_VOUCHER,
          eyeCheckUp,
          glassStatus,
        });
      else
        redeemRes = await redeemVoucher({
          beneficiary: beneficiaryDetails,
          voucherType: VOUCHER.DISCOUNT_VOUCHER,
          voucher: beneficiaryVoucher,
          eyeCheckUp,
          glassStatus,
        });
      setError("root.serverError", {
        type: "manual",
        message: "",
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
      history.push("/otp", {
        data: {
          beneficiaryVoucher,
          beneficiaryDetails,
          redeemRes,
        },
      });
    } catch (error) {
      // fix for release -> uncomment the following lines
      // await new Promise((resolve) => setTimeout(resolve, 0));
      // history.push("/otp", {
      //   data: {
      //     voucher: beneficiaryVoucher,
      //     beneficiaryAddress: beneficiaryDetails?.walletAddress,
      //   },
      // });
      console.log(error);
      setSubmitSuccess(false);
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
    setInProgress(false);
  };

  const handleRefer = () => {
    history.push("/refer-beneficiaries", {
      data: {
        voucher: beneficiaryVoucher,
        beneficiaryAddress: beneficiaryDetails?.walletAddress,
        from: "redeemVoucher",
        beneficiaryDetails,
      },
    });
  };

  const handleDisabledRefer = () => {
    showToast(t("GLOBAL.ERRORS.REFER_LIMIT_REACHED"), "danger");
  };

  const handleGoHome = () => {
    history.push("/tabs/home");
  };

  const handleInputChange = () => {
    setSubmitSuccess(false);
  };

  return (
    <form>
      <CustomLoader isOpen={inProgress} />
      <CustomToast
        isOpen={toastVisible}
        onDidDismiss={hideToast}
        message={toastMessage}
        duration={2000}
        color={toastColor}
      />
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
            <TransparentCard>
              <IonCardContent>
                <IonGrid className="p-0">
                  <IonRow>
                    <IonCol size="6" className="pl-0">
                      {t("REDEEM_VOUCHER_PAGE.LABELS.BENEFICIARY_ADDRESS")}
                    </IonCol>
                    <IonCol size="6" className="pr-0">
                      {cropString(beneficiaryDetails?.walletAddress) || "-"}
                    </IonCol>
                    <IonCol size="6" className="pl-0">
                      {t("REDEEM_VOUCHER_PAGE.LABELS.VOUCHER_TYPE")}
                    </IonCol>
                    <IonCol size="6" className="pr-0">
                      {(voucherType === VOUCHER.DISCOUNT_VOUCHER && (
                        <IonText color="success">
                          {t("GLOBAL.TEXTS.VOUCHER_TYPE.DISCOUNT")}
                        </IonText>
                      )) ||
                        (voucherType === VOUCHER.FREE_VOUCHER && (
                          <IonText color="warning">
                            {t("GLOBAL.TEXTS.VOUCHER_TYPE.FREE")}
                          </IonText>
                        ))}
                    </IonCol>
                    <IonCol size="6" className="pl-0">
                      {t("REDEEM_VOUCHER_PAGE.LABELS.VOUCHER_STATUS")}
                    </IonCol>
                    <IonCol size="6" className="pr-0">
                      {isVoucherClaimed ? (
                        <IonText>{t("REDEEM_VOUCHER_PAGE.REDEEMED")}</IonText>
                      ) : (
                        <IonText>
                          {t("REDEEM_VOUCHER_PAGE.NOT_REDEEMED")}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </TransparentCard>
            {isVoucherClaimed ? (
              <TransparentCard>
                <IonCardContent>
                  <IonRow>
                    <IonCol size="12" className="px-0">
                      <IonText color="danger">
                        {isMaxReferred &&
                          t("GLOBAL.ERRORS.REFER_LIMIT_REACHED")}
                      </IonText>
                      <div
                        onClick={handleDisabledRefer}
                        className="button-full-width"
                      >
                        <IonButton
                          mode="md"
                          expand="block"
                          color="warning"
                          onClick={handleRefer}
                          disabled={isMaxReferred}
                        >
                          {t("REDEEM_VOUCHER_PAGE.BUTTONS.REFER")}
                        </IonButton>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </TransparentCard>
            ) : (
              <TransparentCard>
                <IonCardContent>
                  <IonGrid className="p-0">
                    <div className="gap-5"></div>
                    {/* {voucherType === VOUCHER.DISCOUNT_VOUCHER && ( */}
                    <Controller
                      render={({ field }) => (
                        <FormInputSelect
                          label={t(
                            "REDEEM_VOUCHER_PAGE.LABELS.EYE_CHECKUP_STATUS"
                          )}
                          placeholder={t(
                            "REDEEM_VOUCHER_PAGE.PLACEHOLDERS.EYE_CHECKUP_STATUS"
                          )}
                          value={getValues("eyeCheckupStatus")}
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
                            {t("REDEEM_VOUCHER_PAGE.SELECT.CHECKUP_DONE")}
                          </IonSelectOption>
                          <IonSelectOption value="EYE_CHECKUP_NOT_DONE">
                            {t("REDEEM_VOUCHER_PAGE.SELECT.CHECKUP_NOT_DONE")}
                          </IonSelectOption>
                        </FormInputSelect>
                      )}
                      rules={{
                        required: t(
                          "REDEEM_VOUCHER_PAGE.ERRORS.EYE_CHECKUP_STATUS"
                        ),
                      }}
                      control={control}
                      name="eyeCheckupStatus"
                    />
                    {/* )} */}
                    <div className="gap-5"></div>
                    <div className="gap-5"></div>
                    <div className="gap-5"></div>
                    <Controller
                      render={({ field }) => (
                        <FormInputSelect
                          label={t("REDEEM_VOUCHER_PAGE.LABELS.GLASSES_STATUS")}
                          placeholder={t(
                            "REDEEM_VOUCHER_PAGE.PLACEHOLDERS.GLASSES_STATUS"
                          )}
                          value={getValues("glassesStatus")}
                          onChange={(e) => {
                            setValue("glassesStatus", e.target.value, {
                              shouldValidate: true,
                            });
                            handleInputChange();
                          }}
                          onBlur={field.onBlur}
                          errorText={errors?.glassesStatus?.message}
                        >
                          {voucherType === VOUCHER.FREE_VOUCHER ? (
                            <>
                              <IonSelectOption value="GLASSES_REQUIRED">
                                {t(
                                  "REDEEM_VOUCHER_PAGE.SELECT.GLASSES_REQUIRED"
                                )}
                              </IonSelectOption>
                              <IonSelectOption value="GLASSES_NOT_REQUIRED">
                                {t(
                                  "REDEEM_VOUCHER_PAGE.SELECT.GLASSES_NOT_REQUIRED"
                                )}
                              </IonSelectOption>
                            </>
                          ) : (
                            <>
                              <IonSelectOption value="GLASSES_BOUGHT">
                                {t("REDEEM_VOUCHER_PAGE.SELECT.GLASSES_BOUGHT")}
                              </IonSelectOption>
                              <IonSelectOption value="GLASSES_NOT_BOUGHT">
                                {t(
                                  "REDEEM_VOUCHER_PAGE.SELECT.GLASSES_NOT_BOUGHT"
                                )}
                              </IonSelectOption>
                            </>
                          )}
                        </FormInputSelect>
                      )}
                      rules={{
                        required: t(
                          "REDEEM_VOUCHER_PAGE.ERRORS.GLASSES_STATUS"
                        ),
                      }}
                      control={control}
                      name="glassesStatus"
                    />
                    <div className="gap-5"></div>
                    <div className="gap-5"></div>
                    <div className="gap-5"></div>
                    <IonCol size="12" className="px-0">
                      {submitSuccess && (
                        <IonText color="success">
                          {t("REDEEM_VOUCHER_PAGE.SUCCESS.GLASSES")}
                        </IonText>
                      )}
                      {errors?.root?.serverError?.message && (
                        <IonText color="danger">
                          {errors?.root?.serverError.message}
                        </IonText>
                      )}
                    </IonCol>
                    {/* <IonCol
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
                  </IonCol> */}
                    <br />
                    <CustomDivider />
                    <br />
                    <IonRow>
                      {voucherType === VOUCHER.DISCOUNT_VOUCHER ? (
                        <>
                          <IonCol size="12" className="px-0">
                            {getValues("glassesStatus") ===
                              "GLASSES_NOT_REQUIRED" ||
                            getValues("glassesStatus") ===
                              "GLASSES_NOT_BOUGHT" ? (
                              <IonButton
                                mode="md"
                                expand="block"
                                color="primary"
                                disabled={
                                  isSubmitting ||
                                  !getValues("glassesStatus") ||
                                  !getValues("eyeCheckupStatus")
                                }
                                onClick={handleUpdateStatus}
                              >
                                {t("REDEEM_VOUCHER_PAGE.BUTTONS.UPDATE_STATUS")}
                              </IonButton>
                            ) : (
                              <IonButton
                                mode="md"
                                expand="block"
                                color="success"
                                disabled={
                                  // !isValid ||
                                  isSubmitting ||
                                  !getValues("glassesStatus") ||
                                  getValues("glassesStatus") ===
                                    "GLASSES_NOT_REQUIRED" ||
                                  getValues("glassesStatus") ===
                                    "GLASSES_NOT_BOUGHT"
                                }
                                onClick={handleRedeemVoucher}
                              >
                                {t("REDEEM_VOUCHER_PAGE.BUTTONS.REDEEM")}
                              </IonButton>
                            )}
                          </IonCol>
                          <IonCol sizeSm="12" sizeMd="12" className="px-0">
                            <IonButton
                              onClick={handleGoHome}
                              expand="block"
                              fill="outline"
                            >
                              <IonIcon slot="start" icon={homeOutline} />
                              {t("REDEEM_VOUCHER_PAGE.BUTTONS.GO_HOME")}
                            </IonButton>
                          </IonCol>
                        </>
                      ) : (
                        <>
                          <IonCol size="12" className="px-0">
                            {getValues("glassesStatus") ===
                              "GLASSES_NOT_REQUIRED" ||
                            getValues("glassesStatus") ===
                              "GLASSES_NOT_BOUGHT" ? (
                              <IonButton
                                mode="md"
                                expand="block"
                                color="primary"
                                disabled={
                                  isSubmitting ||
                                  !getValues("glassesStatus") ||
                                  !getValues("eyeCheckupStatus")
                                }
                                onClick={handleUpdateStatus}
                              >
                                {t("REDEEM_VOUCHER_PAGE.BUTTONS.UPDATE_STATUS")}
                              </IonButton>
                            ) : (
                              <IonButton
                                mode="md"
                                expand="block"
                                color="success"
                                disabled={
                                  // !isValid ||
                                  isSubmitting ||
                                  !getValues("glassesStatus") ||
                                  getValues("glassesStatus") ===
                                    "GLASSES_NOT_REQUIRED" ||
                                  getValues("glassesStatus") ===
                                    "GLASSES_NOT_BOUGHT"
                                }
                                onClick={handleRedeemVoucher}
                              >
                                {t("REDEEM_VOUCHER_PAGE.BUTTONS.REDEEM")}
                              </IonButton>
                            )}
                          </IonCol>

                          <IonCol size="12" className="px-0">
                            <div
                              onClick={handleDisabledRefer}
                              className="button-full-width"
                            >
                              <IonButton
                                mode="md"
                                expand="block"
                                color="warning"
                                onClick={handleRefer}
                                disabled={isMaxReferred}
                              >
                                {t("REDEEM_VOUCHER_PAGE.BUTTONS.REFER")}
                              </IonButton>
                            </div>
                          </IonCol>
                        </>
                      )}
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </TransparentCard>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default RedeemVoucher;
