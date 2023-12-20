import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";
import { help, language } from "ionicons/icons";

type Props = {
  handleSync: any;
  handleToggle: any;
  projectSettings: any;
};
const InternetAccessCenter = ({
  handleSync,
  handleToggle,
  projectSettings,
}: Props) => {
  return (
    <IonCard>
      <IonList>
        <IonItem>
          <IonLabel>Internet Status</IonLabel>
          <IonToggle
            checked={projectSettings?.internetAccess}
            onIonChange={handleToggle}
          />
        </IonItem>
        {projectSettings?.internetAccess && (
          <IonItem>
            <IonButton expand="full" onClick={handleSync}>
              Sync Transactions
            </IonButton>
          </IonItem>
        )}
      </IonList>
    </IonCard>
  );
};

export default InternetAccessCenter;
