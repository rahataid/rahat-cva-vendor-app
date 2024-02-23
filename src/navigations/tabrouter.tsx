import React from "react";
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
import ProjectSettingsPage from "@pages/project-settings";
import SettingsPage from "@pages/settings";
import TransactionsListPage from "@pages/transactions-list";
import TransactionsSettingsPage from "@pages/transactions-settings";
import useAppStore from "@store/app";
import { home, person, qrCode, settings } from "ionicons/icons";
import { Redirect, Route, Switch } from "react-router-dom";
import ReferredBeneficiariesSettingsPage from "@pages/referred-beneficiaries-settings";
import ReferredBeneficiariesListPage from "@pages/referred-beneficiary-list";

const Tabs: React.FC = () => {
  const { chainData } = useAppStore((state) => ({
    chainData: state.chainData,
  }));

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route path="/tabs/home" component={HomePage} exact />
          <Route
            path="/tabs/charge-beneficiary"
            component={ChargeBeneficiaryPage}
            exact
          />
          <Route path="/tabs/profile" component={ProfilePage} exact />
          <Route path="/tabs/settings" component={SettingsPage} exact />
          <Route
            path="/tabs/settings/internet-center"
            component={InternetAccessCenterPage}
            exact
          />
          <Route
            path="/tabs/settings/beneficiaries"
            component={BeneficiariesSettingsPage}
            exact
          />
          <Route
            path="/tabs/settings/beneficiaries/list"
            component={BeneficiariesListPage}
            exact
          />
          <Route
            path="/tabs/settings/referred-beneficiaries"
            component={ReferredBeneficiariesSettingsPage}
            exact
          />
          <Route
            path="/tabs/settings/referred-beneficiaries/details"
            component={ReferredBeneficiariesListPage}
            exact
          />
          <Route
            path="/tabs/settings/referred-beneficiaries/list"
            component={ReferredBeneficiariesListPage}
            exact
          />

          <Route
            path="/tabs/settings/transactions"
            component={TransactionsSettingsPage}
            exact
          />
          <Route
            path="/tabs/settings/transactions/list"
            component={TransactionsListPage}
            exact
          />
          <Route
            path="/tabs/settings/project"
            component={ProjectSettingsPage}
            exact
          />
          <Redirect exact from="/tabs" to="/tabs/home" />
          <Redirect to="/not-found" />
        </Switch>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" mode="md">
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
