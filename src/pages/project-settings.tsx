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
import CustomHeader from "@components/header/customHeader";

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
      <CustomHeader title="Project" showStatus showBackButton />
      <IonContent>
        <ProjectSettings {...props} />
      </IonContent>
    </IonPage>
  );
};

export default ProjectSettingsPage;
