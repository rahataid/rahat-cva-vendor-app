import { useVendor } from "@api/vendors";
import CustomHeader from "@components/header/customHeader";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Profile from "@sections/profile";
import useAppStore from "@store/app";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const ProfilePage: FC = () => {
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
