import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

import {
  IonButton,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";
import ReferItem from "./refer-item";
import { useHistory } from "react-router";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_RESULT_BENEFICIARY_DETAILS,
} from "../../types/beneficiaries";
import ResultChip from "@components/chip/statusChip";

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
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <ResultChip status="SUCCESS" />
              </IonCol>
              <IonCol size="12">
                <IonText>The referral has been registered successfully</IonText>
              </IonCol>
            </IonRow>
            <br />
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
