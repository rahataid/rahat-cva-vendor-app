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
import rahatLogo from "@assets/images/logo/rahat-logo-standard.png";
import luxotticaLogo from "@assets/images/logo/luxottica-light.png";
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
      <IonContent>
        <IonGrid className="landing-container">
          <IonRow className="landing-top-container">
            <IonCol
              size="11"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
              className="landing-logo-container"
            >
              {/* <IonRow className="ion-no-padding">
                <IonCol className="left-logo">
                  <IonImg src={luxotticaLogo} />
                </IonCol>
                <IonCol className="right-logo">
                  <IonImg src={rahatLogo} />
                </IonCol>
              </IonRow> */}
              <IonRow className="top-logo">
                <div className="image-container">
                  <IonImg src={luxotticaLogo} />
                </div>
              </IonRow>
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
              <IonText>
                <h6>{t("SELECT_LANGUAGE_PAGE.MSG")}</h6>
              </IonText>
              <LanguageSettings
                customStyle={{ margin: "3px", borderRadius: "4px" }}
                lines="full"
              />
              <IonRow className="gap-5"></IonRow>
              <IonButton
                mode="md"
                color="primary"
                fill="solid"
                expand="block"
                onClick={handleProceed}
              >
                {t("SELECT_LANGUAGE_PAGE.BUTTONS.PROCEED")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectLanguage;
