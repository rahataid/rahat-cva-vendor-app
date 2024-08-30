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
import { FC } from "react";
import Logo from "@assets/images/logo/rahat-logo-standard.png";
import "./not-found.scss";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const NotFoundPage: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <IonPage>
      <IonContent className="bg" fullscreen scrollY={false}>
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
                <h1>{t("NOT_FOUND_PAGE.TITLE")}</h1>
                <p>{t("NOT_FOUND_PAGE.MSG")}</p>
              </IonText>
              <IonButton
                // color="dark"
                fill="solid"
                expand="block"
                onClick={() => history.goBack()}
              >
                {t("NOT_FOUND_PAGE.BUTTONS.BACK")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
