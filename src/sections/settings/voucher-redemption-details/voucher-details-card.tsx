import CustomChip from "@components/chip/customChip";
import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import { formatDate } from "@utils/helperFunctions";
import { VendorVoucherRedemptionDetails } from "../../../types/vendors";

type Props = {
  data: VendorVoucherRedemptionDetails;
};

const VoucherDetailsCard = ({ data }: Props) => {
  return (
    <IonItem mode="md" button={false} lines="full">
      <IonGrid className="px-0">
        <IonRow>
          <IonCol size="6" className="px-0">
            <IonText>
              <p>
                Status:{" "}
                {data?.status === "REQUESTED" ? "Requested" : "Approved"}
              </p>
              <p>Amount: {data?.voucherNumber}</p>
              {/* <p>{formatDate(data?.createdAt) || "-"}</p> */}
            </IonText>
          </IonCol>
          <IonCol size="6" className="voucher-redemption-right-col px-0">
            <CustomChip
              label={
                data?.voucherType === "DISCOUNTVOUCHER"
                  ? "Discount Voucher"
                  : "Free Voucher"
              }
              color={
                data?.voucherType === "DISCOUNTVOUCHER" ? "success" : "warning"
              }
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default VoucherDetailsCard;
