import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";
import useAppStore from "@store/app";
import ProjectSettings from "@sections/settings/project-settings";
import CustomHeader from "@components/header/customHeader";
import { useTranslation } from "react-i18next";

const ProjectSettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { projectSettings, setProjectSettings } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(projectSettings?.baseUrl);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    if (inputValue) setProjectSettings({ baseUrl: inputValue });
  };

  const handleInputChange = (event: CustomEvent) => {
    setInputValue(event.detail.value as string);
  };

  const props = {
    projectSettings,
    isEditing,
    inputValue,
    handleEditClick,
    handleSaveClick,
    handleInputChange,
  };

  return (
    <IonPage>
      <CustomHeader
        title={t("PROJECT_SETTINGS_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <ProjectSettings {...props} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProjectSettingsPage;
