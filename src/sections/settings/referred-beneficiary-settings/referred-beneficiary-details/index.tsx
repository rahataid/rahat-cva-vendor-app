import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { BENEFICIARY_DETAILS, DATE_SOURCE } from "@types/beneficiaries";
import { formatDate } from "@utils/helperFunctions";
import { cropString } from "../../../../utils/helperFunctions";
import { useTranslation } from "react-i18next";

type Props = {
  data: BENEFICIARY_DETAILS;
};

const ReferredBeneficiaryDetails = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <TransparentCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.NAME")}
            </IonCol>
            <IonCol size="6">{data?.piiData?.name || "-"}</IonCol>
            <IonCol size="6">
              {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.PHONE")}
            </IonCol>
            <IonCol size="6">{data?.piiData?.phone || "-"}</IonCol>
            <IonCol size="6">
              {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.GENDER")}
            </IonCol>
            <IonCol size="6">{data?.gender || "-"}</IonCol>
            <IonCol size="6">
              {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.VOUCHER_TYPE")}
            </IonCol>
            <IonCol size="6">
              <IonText color="success">
                {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.DISCOUNT_VOUCHER")}
              </IonText>
            </IonCol>

            <IonCol size="6">
              {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.WALLET_ADDRESS")}
            </IonCol>
            <IonCol size="6">
              {data?.walletAddress ? cropString(data?.walletAddress) : "-"}
            </IonCol>
            <IonCol size="6">
              {t("REFERRED_BENEFICIARY_DETAILS_PAGE.LABELS.DATE")}
            </IonCol>
            <IonCol size="6">
              {data?.createdAt
                ? formatDate(data?.createdAt, DATE_SOURCE.BACKEND)
                : "-"}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </TransparentCard>
  );
};

export default ReferredBeneficiaryDetails;
