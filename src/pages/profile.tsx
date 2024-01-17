import { useVendor } from "@api/vendors";
import CustomHeader from "@components/header/customHeader";
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
      <CustomHeader title="Profile" showStatus />
      <IonContent fullscreen scrollY={false}>
        <Profile {...props} />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
