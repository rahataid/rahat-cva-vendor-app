import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "@types/beneficiaries";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

type Props = {
  beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
  beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
};
interface LocationState {
  data: Props | null;
}

const RedeemVoucherPage: React.FC = () => {
  const location = useLocation<LocationState>();
  const {
    data: { beneficiaryDetails, beneficiaryVoucher },
  } = location.state || { data: null };
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader
        title={t("REDEEM_VOUCHER_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <RedeemVoucher
          beneficiaryDetails={beneficiaryDetails}
          beneficiaryVoucher={beneficiaryVoucher}
        />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
