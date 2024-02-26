import CustomDivider from "@components/divider";
import TextInputField from "@components/input/form-text-input";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { add, removeCircleOutline } from "ionicons/icons";
import "./refer-beneficiaries.scss";

const ReferSection = ({
  showCloseButton,
  beneficiaryNumber,
  onRemove,
}: any) => {
  const handleRemove = () => {
    // Call the onRemove function with the beneficiaryNumber
    if (onRemove) {
      onRemove(beneficiaryNumber);
    }
  };
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="5" className="refer-section-left-col">
            <p>
              <strong>Beneficiary {beneficiaryNumber}</strong>
            </p>
          </IonCol>
          <IonCol size="7" className="refer-section-right-col">
            <IonButton
              color="danger"
              fill="clear"
              size="small"
              onClick={handleRemove}
            >
              <IonIcon icon={removeCircleOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>

      <TextInputField placeholder="Enter name" type="text" />
      <br />
      <TextInputField placeholder="Enter phone" />
      <br />

      <CustomDivider />
    </>
  );
};

export default ReferSection;
