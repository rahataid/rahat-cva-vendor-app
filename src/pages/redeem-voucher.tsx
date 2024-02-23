import CustomHeader from "@components/header/customHeader";
import { IonContent, IonPage } from "@ionic/react";
import ChargeBeneficiary from "@sections/charge-beneficiary";
import RedeemVoucher from "@sections/redeem-voucher";

const RedeemVoucherPage: React.FC = () => {
  return (
    <IonPage>
      <CustomHeader title="Redeem Voucher" showBackButton />
      <IonContent>
        <RedeemVoucher />
      </IonContent>
    </IonPage>
  );
};

export default RedeemVoucherPage;
