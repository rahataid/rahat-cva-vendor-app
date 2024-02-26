import { IonCol, IonRow, IonText } from "@ionic/react";
import "./refer-success.scss";
import CustomDivider from "@components/divider";

const ReferItem = ({ data, key }: any) => {
  return (
    <>
      <IonRow key={key}>
        <IonCol size="8">
          <IonText>
            <h2>{data?.name || "-"}</h2>
            <p>{data?.phone || "-"}</p>
            <p>{new Date(data?.createdAt).toLocaleString() || "-"}</p>
          </IonText>
        </IonCol>
        <IonCol size="4" className="refer-item-right-col">
          {data?.beneficiaryType === "REFERRED" ? (
            <IonText color="success">
              <h2>REFERRED</h2>
            </IonText>
          ) : (
            <IonText color="warning">
              <h2>ENROLLED</h2>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <CustomDivider />
    </>
  );
};

export default ReferItem;
