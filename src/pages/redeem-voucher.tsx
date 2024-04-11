import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import {
  BENEFICIARY_REFERRAL_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
} from "@types/beneficiaries";
import { useLocation } from "react-router";

const RedeemVoucherPage: React.FC = () => {
  type Props = {
    beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
    beneficiaryDetails: BENEFICIARY_REFERRAL_DETAILS;
  };
  interface LocationState {
    data: Props | null;
  }
  const location = useLocation<LocationState>();
  const {
    data: { beneficiaryDetails, beneficiaryVoucher },
  } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Redeem Voucher" showBackButton />
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
