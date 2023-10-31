import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
} from "@ionic/react";
import Logo from "@assets/images/logo/rahat-logo.png";
import "./landing-screen.scss";
import { useHistory } from "react-router";

const LandingScreen = () => {
  const history = useHistory();
  const handleRegister = () => {
    history.push("/register");
  };
  const handleRestore = () => {
    history.push("/restore-wallet");
  };
  return (
    <IonPage>
      <IonContent scrollY={false}>
        <IonGrid className="landing-container">
          <IonRow className="landing-top-container">
            <IonCol
              size="11"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
              className="landing-logo-container"
            >
              <IonImg src={Logo} />
              <IonText className="landing-text-container">
                Supporting vulnerable communities with a simple and efficient
                relief distribution platform
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="landing-button-container">
            <IonCol size="11" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonButton fill="outline" expand="block" onClick={handleRegister}>
                Create New Account
              </IonButton>
              <IonRow className="gap-5"></IonRow>
              <IonButton fill="outline" expand="block" onClick={handleRestore}>
                Restore Account
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LandingScreen;
