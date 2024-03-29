import { IonCol, IonRow, IonText } from "@ionic/react";
import "./refer-result.scss";
import CustomDivider from "@components/divider";
import { formatDate } from "@utils/helperFunctions";
import {
  cropString,
  generateCurrentTimestamp,
} from "../../utils/helperFunctions";

const ReferItem = ({ data, index }: any) => {
  return (
    <>
      <IonRow key={index}>
        <IonCol size="6">Name</IonCol>
        <IonCol size="6">{data?.name || "-"}</IonCol>
        <IonCol size="6">Estimated Age</IonCol>
        <IonCol size="6">{data?.estimatedAge || "-"}</IonCol>
        <IonCol size="6">Phone</IonCol>
        <IonCol size="6">{data?.phone || "-"}</IonCol>
        <IonCol size="6">Gender</IonCol>
        <IonCol size="6">{data?.gender || "-"}</IonCol>
        <IonCol size="6">Address</IonCol>
        <IonCol size="6">{data?.address || "-"}</IonCol>
        <IonCol size="6">Transaction Hash</IonCol>
        <IonCol size="6">
          {data?.transactionHash ? cropString(data?.transactionHash) : "-"}
        </IonCol>
        <IonCol size="6">Created At</IonCol>
        <IonCol size="6">
          {data?.createdAt
            ? formatDate(data?.createdAt)
            : formatDate(generateCurrentTimestamp())}
        </IonCol>

        {/* <IonCol size="8">
          <IonText>
            <p>{data?.name || "-"}</p>

            <p>{data?.phone || "-"}</p>
            <p>{data?.gender || "-"}</p>
            <p>{data?.estimatedAge || "-"} Estimated age</p>

            {data?.address && <p>{data.address}</p>}

            {data?.address && <p>{data.address}</p>}
            <p>{data?.transactionHash || "-"}</p>
            <p>{formatDate(data?.createdAt || new Date()) || "-"}</p>
          </IonText>
        </IonCol> */}
        {/* <IonCol size="4" className="refer-item-right-col">
          <IonText color="success">
            <h2>REFERRED</h2>
          </IonText>
        </IonCol> */}
      </IonRow>
      <CustomDivider />
    </>
  );
};

export default ReferItem;
