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
import "./select-language.scss";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageSettings from "@sections/settings/language-settings";

const SelectLanguage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const handleProceed = () => history.push("/landing");
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
              <IonImg src={Logo} />
              <IonText className="landing-text-container">
                {t("SELECT_LANGUAGE_PAGE.TAGLINE")}
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="landing-button-container">
            <IonCol size="11" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonText>
                <h6>{t("SELECT_LANGUAGE_PAGE.MSG")}</h6>
              </IonText>
              <LanguageSettings
                customStyle={{ margin: "3px", borderRadius: "4px" }}
              />
              <IonRow className="gap-5"></IonRow>
              <IonButton
                mode="md"
                color="primary"
                fill="solid"
                expand="block"
                onClick={handleProceed}
              >
                Proceed
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectLanguage;
