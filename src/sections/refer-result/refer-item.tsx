import { IonCol, IonRow, IonText } from "@ionic/react";
import "./refer-result.scss";
import CustomDivider from "@components/divider";
import { formatDate } from "@utils/helperFunctions";

const ReferItem = ({ data, key }: any) => {
  return (
    <>
      <IonRow key={key}>
        <IonCol size="8">
          <IonText>
            <p>{data?.name || "-"}</p>

            <p>{data?.phone || "-"}</p>
            <p>{data?.gender || "-"}</p>
            <p>{data?.estimatedAge || "-"} age</p>

            {data?.address && <p>{data.address}</p>}
            <p>{formatDate(`${new Date()}`) || "-"}</p>
          </IonText>
        </IonCol>
        <IonCol size="4" className="refer-item-right-col">
          <IonText color="success">
            <h2>REFERRED</h2>
          </IonText>
        </IonCol>
      </IonRow>
      <CustomDivider />
    </>
  );
};

export default ReferItem;
