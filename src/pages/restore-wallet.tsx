import { IonContent, IonPage } from "@ionic/react";
import "../theme/title.css";
import RestoreWallet from "@sections/auth/restore-wallet";
import CustomHeader from "@components/header/customHeader";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const RestoreWalletPage: FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <CustomHeader
        title={t("RESTORE_WALLET_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent fullscreen scrollY={false}>
        <RestoreWallet />
      </IonContent>
    </IonPage>
  );
};

export default RestoreWalletPage;
