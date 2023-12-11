import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import ChargeBeneficiaryPage from "@pages/charge-beneficiary";
import HomePage from "@pages/home";
import ProfilePage from "@pages/profile";
import SettingsPage from "@pages/settings";
import useAppStore from "@store/app";
import { home, person, qrCode, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

const Tabs: React.FC = () => {
  const { chainData } = useAppStore((state) => state.chainData);

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Redirect exact path="/" to="/tabs/home" /> */}
        <Route>
          <Redirect exact path='/tabs' to='/tabs/home' />
          <Route path='/tabs/home' component={HomePage}></Route>
          <Route
            path='/tabs/charge-beneficiary'
            component={ChargeBeneficiaryPage}></Route>
          <Route path='/tabs/profile' component={ProfilePage}></Route>
          <Route path='/tabs/settings' component={SettingsPage}></Route>
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot='bottom'>
        <IonTabButton tab='home' href='/tabs/home'>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        {chainData?.isVendorApproved && (
          <IonTabButton tab='chargeBeneficiary' href='/tabs/charge-beneficiary'>
            <IonIcon icon={qrCode} />
            <IonLabel>Charge Beneficiary</IonLabel>
          </IonTabButton>
        )}
        <IonTabButton tab='profile' href='/tabs/profile'>
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab='settings' href='/tabs/settings'>
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
