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
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./redeem-voucher.scss";
import CustomChip from "@components/chip/customChip";
import BeneficiaryDetails from "./beneficiary-details";
import { SelectInputOptions, VOUCHER } from "../../types/chargeBeneficiary";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

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
      age: "",
      gender: "",
    },
  });
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
                <IonText>
                  <h2>
                    Beneficiary Name:
                    <br /> Mani Ratna Byanjankar
                  </h2>
                  <p>Assigned voucher to the beneficiary</p>
                </IonText>

                <div>
                  <IonText>Voucher Type: </IonText>
                  {(voucherType === VOUCHER.DISCOUNT_VOUCHER && (
                    <CustomChip color="success" label="Discount Voucher" />
                  )) ||
                    (voucherType === VOUCHER.FREE_VOUCHER && (
                      <CustomChip color="warning" label="Free Voucher" />
                    ))}

                  <TextInputFieldMultiLine rows={3} placeholder="Description" />
                </div>

                {voucherType === VOUCHER.FREE_VOUCHER && (
                  <div>
                    <br />
                    <IonButton mode="md" expand="block" color="warning">
                      Refer
                    </IonButton>
                    <IonText>
                      <p className="w-100 align-text-center">
                        Beneficiary will be able to refer 3 people into the
                        project.
                      </p>
                    </IonText>
                    <br />
                    <div className="w-100 align-text-center">OR</div>
                  </div>
                )}

                <br />

                <IonButton
                  type="submit"
                  mode="md"
                  expand="block"
                  color="primary"
                  disabled={!isValid || isSubmitting}
                >
                  Redeem Voucher
                </IonButton>
                <div className="w-100 align-text-center">
                  <IonText>
                    <p>Redeeming voucher will directly send OTP</p>
                  </IonText>
                </div>

                <br />

                <BeneficiaryDetails
                  options={options}
                  getValues={getValues}
                  errors={errors}
                  setValue={setValue}
                  control={control}
                />

                <br />
              </IonCardContent>
            </TransparentCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default RedeemVoucher;
