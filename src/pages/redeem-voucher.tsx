import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import { useLocation } from "react-router";

const RedeemVoucherPage: React.FC = () => {
  type Prop = {
    beneficiaryVoucher: any;
    beneficiary: any;
  };
  interface LocationState {
    data: Prop | null;
  }
  const location = useLocation<LocationState>();
  const {
    data: { beneficiary, beneficiaryVoucher },
  } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Redeem Voucher" showBackButton />
      <IonContent>
        <RedeemVoucher
          beneficiary={beneficiary}
          beneficiaryVoucher={beneficiaryVoucher}
        />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
