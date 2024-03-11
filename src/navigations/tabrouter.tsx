import React from "react";
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
import ProjectSettingsPage from "@pages/project-settings";
import SettingsPage from "@pages/settings";
import TransactionsListPage from "@pages/transactions-list";
import TransactionsSettingsPage from "@pages/transactions-settings";
import useAppStore from "@store/app";
import {
  home,
  homeOutline,
  peopleOutline,
  person,
  personOutline,
  qrCode,
  qrCodeOutline,
  settings,
  settingsOutline,
  swapHorizontalOutline,
} from "ionicons/icons";
import { Redirect, Route, Switch } from "react-router-dom";
import ReferredBeneficiariesListPage from "@pages/referred-beneficiary-list";
import TransactionsDetailPage from "@pages/transactions-details";
import ReferredBeneficiariesDetailsPage from "@pages/referred-beneficiary-details";

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
          <Route path="/tabs/settings/profile" component={ProfilePage} exact />
          <Route path="/tabs/settings" component={SettingsPage} exact />

          <Route
            path="/tabs/referred-beneficiaries"
            component={ReferredBeneficiariesListPage}
            exact
          />
          <Route
            path="/tabs/referred-beneficiaries/:id"
            component={ReferredBeneficiariesDetailsPage}
            exact
          />
          <Route
            path="/tabs/transactions/list"
            component={TransactionsListPage}
            exact
          />
          <Route
            path="/tabs/transactions/:txHash"
            component={TransactionsDetailPage}
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
          <IonIcon icon={homeOutline} />
          {/* <IonLabel>Home</IonLabel> */}
        </IonTabButton>
        <IonTabButton tab="transactions" href="/tabs/transactions/list">
          <IonIcon icon={swapHorizontalOutline} />
          {/* <IonLabel>Home</IonLabel> */}
        </IonTabButton>

        <IonTabButton tab="chargeBeneficiary" href="/tabs/charge-beneficiary">
          <IonIcon icon={qrCodeOutline} />
          {/* <IonLabel>Charge Beneficiary</IonLabel> */}
        </IonTabButton>

        <IonTabButton
          tab="referred-beneficiaries"
          href="/tabs/referred-beneficiaries"
        >
          <IonIcon icon={peopleOutline} />
          {/* <IonLabel>Profile</IonLabel> */}
        </IonTabButton>
        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={settingsOutline} />
          {/* <IonLabel>Settings</IonLabel> */}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
