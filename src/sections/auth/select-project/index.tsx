import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

import TextInputField from "@components/input/form-text-input";
import useAppStore from "@store/app";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { endpoints } from "@utils/axios";
import { fixProjectUrl } from "@utils/helperFunctions";
import useTransactionStore from "@store/transaction";
import { handleError } from "@utils/errorHandler";
import CustomLoader from "@components/loaders/customLoader";
import { useTranslation } from "react-i18next";

enum From {
  register = "register",
  restore = "restore",
}
type Props = {
  from: From;
};

const SelectProject = ({ from }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    setProjectSettings,
    initialize,
    currentUser,
    wallet,
    setCurrentUser,
  } = useAppStore();

  const { triggerUpdate } = useTransactionStore();

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      projectURL: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const addPayload = {
        service: "WALLET",
        name: currentUser?.name,
        phone: currentUser?.phone,
        wallet: currentUser?.walletAddress,
        extras: {
          isVendor: true,
        },
      };

      const projectUrl = fixProjectUrl(data?.projectURL);
      if (from === "register") {
        const vendor = await axios.post(
          `${projectUrl}${endpoints.vendors.add}`,
          addPayload
        );

        setCurrentUser(vendor?.data?.data);
        setProjectSettings({ baseUrl: data?.projectURL });
        await initialize();
        history.push("/tabs/home");
        return;
      } else if (from === "restore") {
        const vendor = await axios.get(
          `${projectUrl}${endpoints.vendors.getByUuid(wallet?.address)}`
        );
        const vendorDetails = vendor?.data?.data;
        setCurrentUser(vendor?.data?.data);
        setProjectSettings({ baseUrl: data?.projectURL });
        if (!vendorDetails?.name) throw new Error("Vendor not found");
        await initialize();
        history.push("/tabs/home");
        return;
      }
    } catch (error: any) {
      console.log("error============", error);
      setError("root.serverError", {
        type: "manual",
        message: handleError(error),
      });
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      <CustomLoader isOpen={isSubmitting} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <IonGrid className="register-container">
          <IonRow className="register-form-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <Controller
                render={({ field }) => (
                  <TextInputField
                    placeholder={t("SELECT_PROJECT_PAGE.PLACEHOLDERS.PROJECT")}
                    type="text"
                    label={t("SELECT_PROJECT_PAGE.LABELS.PROJECT")}
                    value={getValues("projectURL")}
                    errorText={errors?.projectURL?.message}
                    onInput={(e: any) => {
                      setValue("projectURL", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    onBlur={field.onBlur}
                  />
                )}
                rules={{
                  required: t("SELECT_PROJECT_PAGE.ERRORS.PROJECT"),
                }}
                control={control}
                name="projectURL"
              />
              <br />

              {errors?.root?.serverError?.message && (
                <IonText color="danger">
                  {errors?.root?.serverError.message}
                </IonText>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="register-button-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <IonButton
                mode="md"
                type="submit"
                expand="block"
                // color="dark"
                // disabled={isDirty || !isValid || isSubmitting}
              >
                {t("SELECT_PROJECT_PAGE.BUTTONS.SUBMIT")}
                {/* {isSubmitting ? (
                  <IonProgressBar type='indeterminate'></IonProgressBar>
                ) : (
                )} */}
              </IonButton>
              <IonRow className="gap-5"></IonRow>
              <IonButton
                mode="md"
                // color="dark"
                fill="outline"
                expand="block"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {t("SELECT_PROJECT_PAGE.BUTTONS.CANCEL")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default SelectProject;
