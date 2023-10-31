import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OTP from "@sections/claim/otp";

const OTPPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>OTP</IonTitle>
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
