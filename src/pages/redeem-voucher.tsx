import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import RedeemVoucher from "@sections/redeem-voucher";
import { useLocation } from "react-router";

const RedeemVoucherPage: React.FC = () => {
  type Prop = {
    data: any;
    voucher: any;
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
        <RedeemVoucher data={data?.data} voucher={data?.voucher} />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
