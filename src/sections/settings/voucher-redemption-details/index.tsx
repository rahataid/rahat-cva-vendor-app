import TransparentCard from "@components/cards/Transparentcard/TransparentCard";

import { IonCardContent, IonList } from "@ionic/react";
import "./voucher-details-card.scss";
import VoucherDetailsCard from "./voucher-details-card";

const VoucherRedemptionDetails = ({ data }: any) => {
  return (
    <>
      <TransparentCard>
        <IonCardContent className="voucher-details-container">
          <IonList>
            {data?.map((el: any, i: number) => (
              <VoucherDetailsCard index={i} data={el} />
            ))}
          </IonList>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default VoucherRedemptionDetails;
