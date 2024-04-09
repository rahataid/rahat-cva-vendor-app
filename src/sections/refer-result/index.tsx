import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonGrid,
  IonIcon,
  IonText,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import ReferItem from "./refer-item";
import { useHistory } from "react-router";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_RESULT_BENEFICIARY_DETAILS,
} from "../../types/beneficiaries";

type Props = {
  data: {
    data: REFER_RESULT_BENEFICIARY_DETAILS[];
    from: "redeemVoucher" | "transactionResult";
    voucher: BENEFICIARY_VOUCHER_DETAILS;
  };
};

const ReferResult = ({ data: { data, from, voucher } }: Props) => {
  const history = useHistory();
  const handleRedirect = () => {
    if (from === "redeemVoucher") {
      history.push("/tabs/home", { data: { voucher } });
    } else if (from === "transactionResult") {
      history.push("/tabs/home");
    }
  };
  console.log(data, "xxx");
  return (
    <>
      <TransparentCard>
        <IonCardHeader>
          <IonText>
            <p>The referral has been registered successfully</p>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            {data?.length ? (
              data?.map((el: REFER_RESULT_BENEFICIARY_DETAILS, i: number) => (
                <ReferItem key={i} data={el} index={i} />
              ))
            ) : (
              <h2>No Data Available...</h2>
            )}
          </IonGrid>
          {from === "redeemVoucher" ? (
            // <IonButton onClick={() => handleRedirect()} expand="block">
            //   Done
            // </IonButton>
            <IonButton onClick={() => handleRedirect()} expand="block">
              <IonIcon slot="start" icon={homeOutline} />
              Go To Homepage
            </IonButton>
          ) : (
            <IonButton onClick={() => handleRedirect()} expand="block">
              <IonIcon slot="start" icon={homeOutline} />
              Go To Homepage
            </IonButton>
          )}
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default ReferResult;
