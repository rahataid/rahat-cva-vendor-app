import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import LanguageSettings from "@sections/settings/language-settings";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const LanguageSettingsPage: FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader
        title={t("LANGUAGE_SETTINGS_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <LanguageSettings />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default LanguageSettingsPage;
