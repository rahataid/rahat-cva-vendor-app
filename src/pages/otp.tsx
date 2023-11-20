import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OTP from "@sections/claim/otp";
import "../theme/title.css";

const OTPPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">OTP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">OTP</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OTP />
      </IonContent>
    </IonPage>
  );
};

export default OTPPage;
