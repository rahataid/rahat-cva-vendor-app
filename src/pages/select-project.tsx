import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SelectProject from "@sections/auth/select-project";
import "../theme/title.css";
import { useLocation } from "react-router";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Select Project</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Select Project</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectProject from={from} />
      </IonContent>
    </IonPage>
  );
};

export default SelectProjectPage;
