import { IonContent, IonPage } from "@ionic/react";
import SelectProject from "@sections/auth/select-project";
import "../theme/title.css";
import { useLocation } from "react-router";
import CustomHeader from "@components/header/customHeader";
import { useTranslation } from "react-i18next";
import { FC } from "react";

enum From {
  register = "register",
  restore = "restore",
}

type Props = {
  from: From;
};
interface LocationState {
  data: Props;
}

const SelectProjectPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const {
    data: { from },
  } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader
        title={t("SELECT_PROJECT_PAGE.PAGE_TITLE")}
        showBackButton
      />
      <IonContent fullscreen scrollY={false}>
        <SelectProject from={from} />
      </IonContent>
    </IonPage>
  );
};

export default SelectProjectPage;
