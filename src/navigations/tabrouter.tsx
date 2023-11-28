import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  create,
  ellipse,
  home,
  homeOutline,
  paperPlaneOutline,
  person,
  personAddOutline,
  personCircleOutline,
  qrCode,
  settingsOutline,
  square,
  triangle,
  settings,
} from "ionicons/icons";
import { RequireAuth } from "./protected-route";
import HomePage from "@pages/home";
import ChargeTokenPage from "@pages/charge-token";
import ProfilePage from "@pages/profile";
import SettingsPage from "@pages/settings";

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      {/* <Redirect exact path="/" to="/tabs/home" /> */}

      <Redirect exact path="/tabs" to="/tabs/home" />
      <Route path="/tabs/home" component={HomePage}></Route>
      <Route
        path="/tabs/charge-beneficiary"
        component={ChargeTokenPage}
      ></Route>
      <Route path="/tabs/profile" component={ProfilePage}></Route>
      <Route path="/tabs/settings" component={SettingsPage}></Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="chargeBeneficiary" href="/tabs/charge-beneficiary">
        <IonIcon icon={qrCode} />
        <IonLabel>Charge Beneficiary</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/tabs/profile">
        <IonIcon icon={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/tabs/settings">
        <IonIcon icon={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
