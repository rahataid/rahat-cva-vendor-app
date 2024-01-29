import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import React from "react";
import Logo from "@assets/images/logo/rahat-logo-white.png";
import { useHistory } from "react-router";
import useAppStore from "@store/app";
import useTransactionStore from "@store/transaction";
import useBeneficiaryStore from "@store/beneficiary";

const Reset: React.FC = () => {
  const history = useHistory();

  const { logout } = useAppStore();
  const { logoutTransactions } = useTransactionStore();
  const { logoutBeneficiaries } = useBeneficiaryStore();

  const handleReset = async () => {
    logout();
    logoutTransactions();
    logoutBeneficiaries();
    history.push("/landing");
  };
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <IonGrid className="landing-container">
          <IonRow className="landing-top-container">
            <IonCol
              size="11"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
              className="landing-logo-container"
            >
              <IonImg src={Logo} />
              <IonText className="landing-text-container">
                <h1>Are you sure you want to reset the app?</h1>
                <p>This will clear all the data of the application</p>
              </IonText>
              <IonButton
                color="white"
                fill="solid"
                expand="block"
                onClick={handleReset}
              >
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Reset;
