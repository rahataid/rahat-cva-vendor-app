import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";
import RedeemVoucher from "@sections/redeem-voucher";
import { IBeneficiary, VOUCHER } from "@types/beneficiaries";
import { useLocation } from "react-router";

const RedeemVoucherPage: React.FC = () => {
  type Prop = {
    data: IBeneficiary;
  };

  interface LocationState {
    data: Prop | null;
  }
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Redeem Voucher" showBackButton />
      <IonContent>
        <RedeemVoucher data={data?.data} />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
