import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import CustomDivider from "@components/divider";
import TextInputField from "@components/input/form-text-input";
import {
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonText,
} from "@ionic/react";
import { add } from "ionicons/icons";
import ReferSection from "./refer-section";
import { useState } from "react";
import { useHistory } from "react-router";

const ReferBeneficiaries = () => {
  const history = useHistory();
  const [beneficiaries, setBeneficiaries] = useState([1]);

  const handleAddMore = () => {
    if (beneficiaries.length < 3) {
      setBeneficiaries([...beneficiaries, beneficiaries.length + 1]);
    }
  };

  const handleRemove = (beneficiaryNumber) => {
    setBeneficiaries(
      beneficiaries.filter((number) => number !== beneficiaryNumber)
    );
  };

  const handleSubmit = () => {
    history.push("/refer-success");
  };

  return (
    <>
      <TransparentCard>
        <IonCardHeader>
          <IonText>
            <p>You are about to add beneficiaries to the project</p>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          {beneficiaries.map((beneficiaryNumber) => (
            <ReferSection
              key={beneficiaryNumber}
              beneficiaryNumber={beneficiaryNumber}
              onRemove={handleRemove}
            />
          ))}
          <IonButton
            color="primary"
            fill="outline"
            size="small"
            onClick={handleAddMore}
            disabled={beneficiaries?.length === 3}
          >
            <IonIcon slot="start" icon={add} />
            Add More
          </IonButton>
          <br /> <br />
          <IonButton expand="block" onClick={handleSubmit}>
            Submit
          </IonButton>
        </IonCardContent>
      </TransparentCard>
    </>
  );
};

export default ReferBeneficiaries;
