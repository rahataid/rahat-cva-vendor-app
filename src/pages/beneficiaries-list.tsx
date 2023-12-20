import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import BeneficiariesList from "@sections/settings/beneficiaries-settings/beneficiaries-list";
import useAppStore from "@store/app";

const BeneficiariesListPage: React.FC = () => {
  const { beneficiaries } = useAppStore();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              color="white"
              icon={caretBack}
              defaultHref="/tabs/settings/beneficiaries"
            ></IonBackButton>
          </IonButtons>
          <IonTitle className="title-center">Beneficiaries List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <BeneficiariesList data={beneficiaries} />
      </IonContent>
    </IonPage>
  );
};

export default BeneficiariesListPage;
