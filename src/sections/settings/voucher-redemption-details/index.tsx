import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

import { IonCardContent, IonList, IonText } from "@ionic/react";
import "./voucher-details-card.scss";
import VoucherDetailsCard from "./voucher-details-card";
import { useVendorVoucherRedemptionList } from "../../../api/vendors";
import { VendorVoucherRedemptionDetails } from "../../../types/vendors";

const VoucherRedemptionDetails = () => {
  const { data, isLoading, error } = useVendorVoucherRedemptionList();
  return (
    <>
      <TransparentCard>
        <IonCardContent className="voucher-details-container">
          {data?.length ? (
            <IonList>
              {data?.map((el: VendorVoucherRedemptionDetails, i: number) => (
                <VoucherDetailsCard key={i} data={el} />
              ))}
            </IonList>
          ) : (
            <IonText className="ion-text-center">
              <p>No data available...</p>
            </IonText>
          )}
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default VoucherRedemptionDetails;
