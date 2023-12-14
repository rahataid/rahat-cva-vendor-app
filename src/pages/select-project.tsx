import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SelectProject from "@sections/auth/select-project";
import "../theme/title.css";

const SelectProjectPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Select Project</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Select Project</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectProject />
      </IonContent>
    </IonPage>
  );
};

export default SelectProjectPage;
