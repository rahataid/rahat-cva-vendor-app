import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Register from "@sections/auth/registration";
import "../theme/title.css";
import { caretBack } from "ionicons/icons";

const RegisterPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="white" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle color="white">
            <IonText>Register</IonText>
          </IonTitle>
          <IonButtons slot="end">
            <></>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Register />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
