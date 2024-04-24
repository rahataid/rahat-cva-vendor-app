import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import OTP from "@sections/claim/otp";
import "../theme/title.css";
import { useLocation } from "react-router-dom";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "../types/beneficiaries";
import CustomHeader from "@components/header/customHeader";
import { useTranslation } from "react-i18next";
import { UpdateStatusRes } from "@types/transactions";

interface LocationState {
  data: {
    beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
    redeemRes: UpdateStatusRes;
  };
}

const OTPPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title={t("OTP_PAGE.PAGE_TITLE")} showBackButton />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <OTP data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OTPPage;
