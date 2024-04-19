import {
  IonButton,
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
  IonText,
} from "@ionic/react";

import TextInputField from "@components/input/form-text-input";
import useAppStore from "@store/app";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { endpoints } from "@utils/axios";
import { fixProjectUrl } from "@utils/helperFunctions";
import useTransactionStore from "@store/transaction";
import { handleError } from "@utils/errorHandler";

enum From {
  register = "register",
  restore = "restore",
}
type Props = {
  from: From;
};

const SelectProject = ({ from }: Props) => {
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
      // const [contracts, blockchain] = await Promise.all([
      //   axios.get(`${data?.project}/app/contracts`),
      //   axios.get(`${data?.project}/app/blockchain`),
      // ]);

      // if (contracts?.data && blockchain?.data) {
      //   const projectSettings = {
      //     baseUrl: data?.project,
      //     contracts: contracts?.data?.value,
      //     network: blockchain?.data?.value,
      //     // TODO:Make it dynamic
      //     projectId: "0x5001eb9c680a2690e7b1e97b1104574ab7b75cac",
      //   };
      //   setProjectSettings(projectSettings);

      //   history.push("/home");
      // }
      console.log("CURRENT USER", currentUser);
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
      console.log("FIXED PROJECT URL", projectUrl);
      if (from === "register") {
        const vendor = await axios.post(
          `${projectUrl}${endpoints.vendors.add}`,
          addPayload
        );

        console.log("VENDOR RESPONSE", vendor?.data?.data);
        setCurrentUser(vendor?.data?.data);
        setProjectSettings({ baseUrl: data?.projectURL });
        await initialize();
        history.push("/tabs/home");
        return;

        const [settings] = await Promise.all([
          axios.post(`${projectUrl}${endpoints.projects.actions(PROJECT_ID)}`, {
            action: "settings.list",
            payload: {},
          }),
        ]);

        console.log("RESPONSES", { settings, vendor });
        const projectSettings = {
          baseUrl: data?.projectURL,
          contracts: settings?.data.data[0].value,
          network: settings?.data.data[1].value,
        };
        await setProjectSettings(projectSettings);
        await initialize();
        triggerUpdate();
        history.push("/tabs/home");
      } else if (from === "restore") {
        console.log("ELSE IF INSIDE");
        const vendor = await axios.get(
          `${projectUrl}${endpoints.vendors.getByUuid(wallet?.address)}`
        );
        const vendorDetails = vendor?.data?.data;
        setCurrentUser(vendor?.data?.data);
        setProjectSettings({ baseUrl: data?.projectURL });
        console.log(vendorDetails, "VENDOR RES");
        if (!vendorDetails?.name) throw new Error("Vendor not found");
        await initialize();
        history.push("/tabs/home");
        return;
        const settings = await axios.post(
          `${projectUrl}${endpoints.projects.actions(PROJECT_ID)}`,
          {
            action: "settings.list",
            payload: {},
          }
        );

        console.log(settings?.data.data);
        const projectSettings = {
          baseUrl: data?.projectURL,
          contracts: settings?.data?.data[0]?.value,
          network: settings?.data?.data[1]?.value,
        };
        console.log(projectSettings);
        await setProjectSettings(projectSettings);
        await initialize();
        triggerUpdate();
        history.push("/tabs/home");

        // const { data: vendor } = await axios.get(
        //   `${projectUrl}${endpoints.vendors.details(wallet?.address)}`
        // );
        // const payload = {
        //   name: vendor?.name,
        //   phone: vendor?.phone,
        //   walletAddress: vendor?.walletAddress,
        // };
        // setCurrentUser(payload);

        // const [blockchain, contracts, contractDetails] = await Promise.all([
        //   axios.get(
        //     `${projectUrl}${endpoints.projectSettings.settings("Blockchain")}`
        //   ),
        //   axios.get(
        //     `${projectUrl}${endpoints.projectSettings.settings("Contract")}`
        //   ),
        //   axios.get(
        //     `${projectUrl}${endpoints.projectSettings.contractDetails(
        //       "CVAProject"
        //     )}`
        //   ),
        // ]);

        // console.log({ blockchain, contracts });

        // if (contracts?.data && blockchain?.data && contractDetails?.data) {
        //   const projectSettings = {
        //     baseUrl: data?.projectURL,
        //     contracts: contracts?.data?.rows[0].value,
        //     network: blockchain?.data?.rows[0].value,
        //     projectId: contractDetails?.data?.address,
        //   };
        //   await setProjectSettings(projectSettings);
        //   await initialize();
        //   triggerUpdate();
        //   history.push("/tabs/home");
        // }
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
      <IonLoading mode="md" isOpen={isSubmitting} message={"Please wait..."} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <IonGrid className="register-container">
          <IonRow className="register-form-container">
            <IonCol size="11" sizeMd="11" sizeLg="6" sizeXl="4">
              <Controller
                render={({ field }) => (
                  <TextInputField
                    placeholder="Enter Project URL"
                    type="text"
                    label="Project URL*"
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
                  required: "Please enter the project URL",
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
                Submit
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
                Cancel
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </>
  );
};

export default SelectProject;
