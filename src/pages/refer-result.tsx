import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import ReferResult from "@sections/refer-result";
import { useLocation } from "react-router";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_RESULT_BENEFICIARY_DETAILS,
} from "../types/beneficiaries";
import { useTranslation } from "react-i18next";
import { FC } from "react";

type LocationState = {
  data: {
    data: REFER_RESULT_BENEFICIARY_DETAILS[];
    from: "redeemVoucher" | "transactionResult";
    voucher: BENEFICIARY_VOUCHER_DETAILS;
  };
};

const ReferResultPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const { data } = location.state || { data: null };

  return (
    <IonPage>
      <CustomHeader title={t("REFER_RESULT_PAGE.PAGE_TITLE")} />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ReferResult data={data} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ReferResultPage;
