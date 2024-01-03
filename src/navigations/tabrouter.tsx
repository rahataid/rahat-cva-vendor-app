import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import BeneficiariesListPage from "@pages/beneficiaries-list";
import BeneficiariesSettingsPage from "@pages/beneficiaries-settings";
import ChargeBeneficiaryPage from "@pages/charge-beneficiary";
import HomePage from "@pages/home";
import InternetAccessCenterPage from "@pages/internet-center";
import ProfilePage from "@pages/profile";
import SettingsPage from "@pages/settings";
import TransactionsListPage from "@pages/transactions-list";
import TransactionsSettingsPage from "@pages/transactions-settings";
import useAppStore from "@store/app";
import { home, person, qrCode, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

const Tabs: React.FC = () => {
  const { chainData } = useAppStore((state) => ({
    chainData: state.chainData,
  }));

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Redirect exact path="/" to="/tabs/home" /> */}
        <Route>
          <Redirect exact path="/tabs" to="/tabs/home" />
          <Route path="/tabs/home" component={HomePage}></Route>
          <Route
            path="/tabs/charge-beneficiary"
            component={ChargeBeneficiaryPage}
          ></Route>
          <Route exact path="/tabs/profile" component={ProfilePage}></Route>
          <Route exact path="/tabs/settings" component={SettingsPage}></Route>
          <Route
            exact
            path="/tabs/settings/internet-center"
            component={InternetAccessCenterPage}
          />
          <Route
            exact
            path="/tabs/settings/beneficiaries"
            component={BeneficiariesSettingsPage}
          />
          <Route
            exact
            path="/tabs/settings/beneficiaries/list"
            component={BeneficiariesListPage}
          />
          <Route
            exact
            path="/tabs/settings/transactions"
            component={TransactionsSettingsPage}
          />
          <Route
            exact
            path="/tabs/settings/transactions/list"
            component={TransactionsListPage}
          />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        {chainData?.isVendorApproved && (
          <IonTabButton tab="chargeBeneficiary" href="/tabs/charge-beneficiary">
            <IonIcon icon={qrCode} />
            <IonLabel>Charge Beneficiary</IonLabel>
          </IonTabButton>
        )}
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
};

export default Tabs;
