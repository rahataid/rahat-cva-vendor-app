import rahatLogo from "@assets/images/logo/rahat-logo-standard.png";
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
import useAppStore from "@store/app";
import { fixProjectUrl } from "@utils/helperFunctions";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

const RefreshAccessToken: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setCurrentUser, getAccessToken, initialize, projectSettings } =
    useAppStore();

  const handleRefresh = async () => {
    console.log("projectSettings?.baseUrl as string", projectSettings?.baseUrl);
    const accessToken = await getAccessToken(
      fixProjectUrl(projectSettings?.baseUrl as string) as string
    );
    setCurrentUser({ accessToken });
    await initialize();
    history.push("/tabs/home");
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
              <IonImg src={rahatLogo} />
              <IonText className="landing-text-container">
                <h1>{t("REFRESH_ACCESS_TOKEN.TITLE")}</h1>
                <p>{t("REFRESH_ACCESS_TOKEN.MSG")}</p>
              </IonText>
              <IonButton
                color="primary"
                fill="solid"
                expand="block"
                onClick={handleRefresh}
              >
                {t("REFRESH_ACCESS_TOKEN.BUTTONS.REFRESH")}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RefreshAccessToken;
