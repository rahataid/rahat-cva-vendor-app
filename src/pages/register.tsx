import { IonContent, IonPage } from "@ionic/react";
import Register from "@sections/auth/registration";
import "../theme/title.css";
import CustomHeader from "@components/header/customHeader";
import { useEffect } from "react";

const RegisterPage: React.FC = () => {
  useEffect(() => console.log("REGISTER PAGE"));
  return (
    <IonPage>
      <CustomHeader title="Register" showBackButton />
      <IonContent fullscreen scrollY={false}>
        <Register />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
