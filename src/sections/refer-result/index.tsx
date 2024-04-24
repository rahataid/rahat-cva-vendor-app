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
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  data: {
    data: REFER_RESULT_BENEFICIARY_DETAILS[];
    from: "redeemVoucher" | "transactionResult";
    voucher: BENEFICIARY_VOUCHER_DETAILS;
  };
};

const ReferResult: FC<Props> = ({ data: { data, from, voucher } }) => {
  const { t } = useTranslation();
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
                <IonText>{t("REFER_RESULT_PAGE.SUCCESS_MSG")}</IonText>
              </IonCol>
            </IonRow>
            <br />
            {data?.length ? (
              data?.map((el: REFER_RESULT_BENEFICIARY_DETAILS, i: number) => (
                <ReferItem key={i} data={el} index={i} />
              ))
            ) : (
              <h2>{t("REFER_RESULT_PAGE.NO_DATA")}</h2>
            )}
          </IonGrid>
          {from === "redeemVoucher" ? (
            // <IonButton onClick={() => handleRedirect()} expand="block">
            //   Done
            // </IonButton>
            <IonButton onClick={() => handleRedirect()} expand="block">
              <IonIcon slot="start" icon={homeOutline} />
              {t("REFER_RESULT_PAGE.BUTTONS.GO_HOME")}
            </IonButton>
          ) : (
            <IonButton onClick={() => handleRedirect()} expand="block">
              <IonIcon slot="start" icon={homeOutline} />
              {t("REFER_RESULT_PAGE.BUTTONS.GO_HOME")}
            </IonButton>
          )}
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default ReferResult;
