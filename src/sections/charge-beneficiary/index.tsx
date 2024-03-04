import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
  isPlatform,
} from "@ionic/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./charge-beneficiary.scss";
import ChargePhone from "./charge-phone";

import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { mockBeneficiaries } from "@utils/mockData";

const ChargeBeneficiary = ({ data }: any) => {
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);

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
      phone: "",
    },
  });

  const beneficiaries = mockBeneficiaries;

  const fetchBeneficiaryVoucher = async (data: any) => {
    console.log("SUBMIT BENEFICIARY VOUCHER", data);
    const beneficiary = beneficiaries.find((el) => el.phone == data.phone);
    if (!beneficiary) {
      throw new Error("Invalid beneficiary");
    }
    // let voucherType;
    // if (data.phone == "1") voucherType = "FREE_VOUCHER";
    // else voucherType = "DISCOUNT_VOUCHER";
    history.push("/redeem-voucher", { data: { data: beneficiary } });
  };

  const onSubmit = async (data: any) => {
    try {
      setLoadingVisible(true);
      await fetchBeneficiaryVoucher(data);
      setLoadingVisible(false);
    } catch (error: any) {
      setLoadingVisible(false);
      console.log(error);

      // const validErrors = [
      //   "Invalid beneficiary",
      //   "Invalid Beneficiary Address",
      //   "Not enough balance",
      //   "Please sync beneficiaries to charge in offline mode",
      // ];
      // const errorMessage = validErrors.includes(error.message)
      //   ? error.message
      //   : "Something went wrong. Try again later";

      setError("root.serverError", {
        type: "manual",
        message: error?.message || "Something went wrong! Try again later.",
      });
    }
  };

  return (
    <>
      <IonLoading
        mode="md"
        isOpen={loadingVisible}
        message={"Please wait..."}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <TransparentCard>
          <IonCardContent>
            <ChargePhone
              getValues={getValues}
              errors={errors}
              setValue={setValue}
              control={control}
            />
            <IonButton
              mode="md"
              type="submit"
              expand="block"
              color="primary"
              disabled={!isValid || isSubmitting}
            >
              Fetch Beneficiary Voucher
            </IonButton>
          </IonCardContent>
        </TransparentCard>

        {/* <IonRow className="charge-button-container">
            <IonCol
              size="11"
              sizeMd="11"
              sizeLg="11"
              sizeXl="11"
              className="charge-button-wrapper"
            >
              {!isPlatformWeb && (
                <IonButton
                  mode="md"
                  color="dark"
                  fill="outline"
                  onClick={handleToggle}
                  disabled={isSubmitting}
                >
                  "Scan"
                </IonButton>
              )}

              <IonButton
                mode="md"
                type="submit"
                expand="block"
                color="dark"
                disabled={!isValid || isSubmitting}
              >
                Fetch Beneficiary Voucher
              </IonButton>
            </IonCol>
          </IonRow> */}
      </form>
    </>
  );
};

export default ChargeBeneficiary;
