import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import {
  IonButton,
  IonCard,
  IonItem,
  IonList,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isEditing: boolean;
  inputValue: string;
  handleEditClick: any;
  handleSaveClick: any;
  handleInputChange: any;
};

const ProjectSettings: FC<Props> = ({
  isEditing,
  inputValue,
  handleEditClick,
  handleSaveClick,
  handleInputChange,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TransparentCard>
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="8">
                  {isEditing ? (
                    <IonInput
                      value={inputValue}
                      placeholder={t(
                        "SELECT_PROJECT_SETTINGS_PAGE.PLACEHOLDERS.PROJECT"
                      )}
                      onIonInput={handleInputChange}
                    ></IonInput>
                  ) : (
                    <div>{inputValue}</div>
                  )}
                </IonCol>
                <IonCol size="4">
                  {isEditing ? (
                    <IonButton
                      className="btn-text-white"
                      expand="full"
                      onClick={handleSaveClick}
                    >
                      {t("SELECT_PROJECT_SETTINGS_PAGE.BUTTONS.SAVE")}
                    </IonButton>
                  ) : (
                    <IonButton
                      className="btn-text-white"
                      expand="full"
                      onClick={handleEditClick}
                    >
                      {t("SELECT_PROJECT_SETTINGS_PAGE.BUTTONS.EDIT")}
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
      </TransparentCard>
    </>
  );
};

export default ProjectSettings;
