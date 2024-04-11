import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import { IonCardContent, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { BENEFICIARY_DETAILS } from "@types/beneficiaries";
import { formatDate } from "@utils/helperFunctions";
import { cropString } from "../../../../utils/helperFunctions";

type Props = {
  data: BENEFICIARY_DETAILS;
};

const ReferredBeneficiaryDetails = ({ data }: Props) => {
  return (
    <TransparentCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">Beneficiary Name</IonCol>
            <IonCol size="6">{data?.piiData?.name || "-"}</IonCol>
            <IonCol size="6">Phone Number</IonCol>
            <IonCol size="6">{data?.piiData?.phone || "-"}</IonCol>
            <IonCol size="6">Gender</IonCol>
            <IonCol size="6">{data?.gender || "-"}</IonCol>
            <IonCol size="6">Voucher Type</IonCol>
            <IonCol size="6">
              <IonText color="success">Discount Voucher</IonText>
            </IonCol>

            <IonCol size="6">Wallet Address</IonCol>
            <IonCol size="6">{cropString(data?.walletAddress) || "-"}</IonCol>
            <IonCol size="6">Date</IonCol>
            <IonCol size="6">
              {formatDate(new Date(data?.createdAt) / 1000) || "-"}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </TransparentCard>
  );
};

export default ReferredBeneficiaryDetails;
