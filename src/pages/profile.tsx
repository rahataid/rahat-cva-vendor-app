import { useVendor } from "@api/vendors";
import CustomHeader from "@components/header/customHeader";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Profile from "@sections/profile";
import useAppStore from "@store/app";
import { useTranslation } from "react-i18next";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  let { wallet } = useAppStore();
  const { vendor, isLoading, error } = useVendor(wallet?.address);
  const props = {
    currentUser: vendor,
  };
  return (
    <IonPage>
      <CustomHeader title={t("PROFILE_PAGE.PAGE_TITLE")} showBackButton />
      <IonContent fullscreen scrollY={false}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="12" sizeLg="8" sizeXl="8">
              <Profile {...props} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
