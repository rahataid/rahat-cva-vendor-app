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

type Props = {
  projectSettings: any;
  isEditing: boolean;
  inputValue: string;
  handleEditClick: any;
  handleSaveClick: any;
  handleInputChange: any;
};

const ProjectSettings = ({
  projectSettings,
  isEditing,
  inputValue,
  handleEditClick,
  handleSaveClick,
  handleInputChange,
}: Props) => {
  console.log(projectSettings?.internetAccess);

  return (
    <>
      <IonCard>
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="8">
                  {isEditing ? (
                    <IonInput
                      value={inputValue}
                      placeholder="Enter value"
                      onIonInput={handleInputChange}
                    ></IonInput>
                  ) : (
                    <div>{inputValue}</div>
                  )}
                </IonCol>
                <IonCol size="4">
                  {isEditing ? (
                    <IonButton expand="full" onClick={handleSaveClick}>
                      Save
                    </IonButton>
                  ) : (
                    <IonButton expand="full" onClick={handleEditClick}>
                      Edit
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
      </IonCard>
    </>
  );
};

export default ProjectSettings;
