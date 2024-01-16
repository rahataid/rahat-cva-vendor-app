import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import React from "react";
import Logo from "@assets/images/logo/rahat-logo-white.png";
import "./not-found.scss";
import { useHistory } from "react-router";

const NotFoundPage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
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
                <h1>404 Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
              </IonText>
              <IonButton
                color="white"
                fill="solid"
                expand="block"
                onClick={() => history.goBack()}
              >
                Go Back
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
