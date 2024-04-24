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
import React, { FC } from "react";
import Logo from "@assets/images/logo/rahat-logo-white.png";
import { useHistory } from "react-router";
import useAppStore from "@store/app";
import useTransactionStore from "@store/transaction";
import useBeneficiaryStore from "@store/beneficiary";
import { useTranslation } from "react-i18next";

const Reset: FC = () => {
  const { t } = useTranslation();
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
                <h1>{t("RESET_PAGE.TITLE")}</h1>
                <p>{t("RESET_PAGE.MSG")}</p>
              </IonText>
              <IonButton
                color="dark"
                fill="solid"
                expand="block"
                onClick={handleReset}
              >
                {t("RESET_PAGE.BUTTONS.RESET")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Reset;
