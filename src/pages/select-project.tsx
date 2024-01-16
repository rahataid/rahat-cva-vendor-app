import { IonContent, IonPage } from "@ionic/react";
import SelectProject from "@sections/auth/select-project";
import "../theme/title.css";
import { useLocation } from "react-router";
import CustomHeader from "@components/header/customHeader";

const SelectProjectPage: React.FC = () => {
  enum From {
    register = "register",
    restore = "restore",
  }

  type Prop = {
    from: From;
  };

  interface LocationState {
    data: Prop;
  }
  const location = useLocation<LocationState>();
  const {
    data: { from },
  } = location.state || { data: null };
  return (
    <IonPage>
      <CustomHeader title="Select Project" showBackButton />
      <IonContent fullscreen scrollY={false}>
        <SelectProject from={from} />
      </IonContent>
    </IonPage>
  );
};

export default SelectProjectPage;
