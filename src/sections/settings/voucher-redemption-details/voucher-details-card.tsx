import CustomChip from "@components/chip/customChip";
import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import { formatDate } from "@utils/helperFunctions";

const VoucherDetailsCard = ({ index, data }: any) => {
  return (
    <IonItem mode="md" key={index} button={false} lines="full">
      <IonGrid className="px-0">
        <IonRow>
          <IonCol size="6" className="px-0">
            <IonText>
              <h2>{data?.name}</h2>
              <p>{data?.phone}</p>
              <p>{formatDate(data?.createdAt) || "-"}</p>
            </IonText>
          </IonCol>
          <IonCol size="6" className="voucher-redemption-right-col px-0">
            <CustomChip
              label={data?.voucherType}
              color={
                data?.voucherType === "DISCOUNT_VOUCHER" ? "success" : "warning"
              }
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default VoucherDetailsCard;
