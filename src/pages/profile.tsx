import { useVendor } from "@api/vendors";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Profile from "@sections/profile";
import useAppStore from "@store/app";

const ProfilePage: React.FC = () => {
  let { wallet } = useAppStore.getState();
  const { vendor, isLoading, error } = useVendor(wallet?.address);
  const props = {
    currentUser: vendor,
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Profile {...props} />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
