import React, { useState } from "react";
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
import useAppStore from "@store/app";
import ProjectSettings from "@sections/settings/project-settings";

const ProjectSettingsPage: React.FC = () => {
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              color="white"
              icon={caretBack}
              defaultHref="/tabs/settings"
            ></IonBackButton>
          </IonButtons>
          <IonTitle color="white">Project</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProjectSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default ProjectSettingsPage;
