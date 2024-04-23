import { IonContent, IonPage } from "@ionic/react";
import Register from "@sections/auth/registration";
import "../theme/title.css";
import CustomHeader from "@components/header/customHeader";
import { useTranslation } from "react-i18next";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader title={t("REGISTER_PAGE.PAGE_TITLE")} showBackButton />
      <IonContent fullscreen scrollY={false}>
        <Register />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
