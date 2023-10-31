import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Register from "@sections/auth/registration/register";

const RegisterPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
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
