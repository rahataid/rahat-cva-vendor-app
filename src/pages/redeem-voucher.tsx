import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import { useLocation } from "react-router";

const RedeemVoucherPage: React.FC = () => {
  type Prop = {
    beneficiaryAddress: string;
    beneficiaryVoucher: any;
    data: any;
  };
  interface LocationState {
    data: Prop | null;
  }
  const location = useLocation<LocationState>();
  const {
    data: { data, beneficiaryAddress, beneficiaryVoucher },
  } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Redeem Voucher" showBackButton />
      <IonContent>
        <RedeemVoucher
          data={data}
          beneficiaryAddress={beneficiaryAddress}
          beneficiaryVoucher={beneficiaryVoucher}
        />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
