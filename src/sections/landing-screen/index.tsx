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
import Logo from "@assets/images/logo/rahat-logo-standard.png";
import "./landing-screen.scss";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import rahatLogo from "@assets/images/logo/rahat-logo-standard.png";
import luxotticaLogo from "@assets/images/logo/luxottica-light.png";

const LandingScreen: FC = () => {
  const history = useHistory();
  const handleRegister = () => {
    history.push("/register");
  };
  const handleRestore = () => {
    history.push("/restore-wallet");
  };
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent className="bg" scrollY={false}>
        <IonGrid className="landing-container">
          <IonRow className="landing-top-container">
            <IonCol
              size="11"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
              className="landing-logo-container"
            >
              <IonRow className="bottom-logo">
                <div className="image-container">
                  <IonImg src={rahatLogo} />
                </div>
                <IonText className="landing-text-container">
                  <p>{t("SELECT_LANGUAGE_PAGE.TAGLINE")}</p>
                </IonText>
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow className="landing-button-container">
            <IonCol size="11" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonButton
                mode="md"
                // color="dark"
                fill="solid"
                expand="block"
                onClick={handleRegister}
              >
                {t("LANDING_PAGE.BUTTONS.CREATE_WALLET")}
              </IonButton>
              <IonRow className="gap-5"></IonRow>
              <IonButton
                mode="md"
                // color="dark"
                fill="solid"
                expand="block"
                onClick={handleRestore}
              >
                {t("LANDING_PAGE.BUTTONS.RESTORE_WALLET")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LandingScreen;
