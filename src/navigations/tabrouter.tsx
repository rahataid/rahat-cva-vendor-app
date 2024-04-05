import React from "react";
import {
  IonIcon,
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
import useAppStore from "@store/app";
import {
  homeOutline,
  peopleOutline,
  qrCodeOutline,
  settingsOutline,
  swapHorizontalOutline,
} from "ionicons/icons";
import { Redirect, Route, Switch } from "react-router-dom";
import ReferredBeneficiariesListPage from "@pages/referred-beneficiary-list";
import TransactionsDetailPage from "@pages/transactions-details";
import ReferredBeneficiariesDetailsPage from "@pages/referred-beneficiary-details";
import VoucherRedemptionDetailsPage from "@pages/voucher-redemption";
import RedeemVoucherVendorPage from "../pages/redeem-voucher-vendor";
import RedeemDiscountVoucherPage from "../pages/redeem-discount-voucher";
import RedeemFreeVoucherPage from "../pages/redeem-free-voucher";

const Tabs: React.FC = () => {
  const { currentUser } = useAppStore();
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
            path="/tabs/referred-beneficiaries/:uuid"
            component={ReferredBeneficiariesDetailsPage}
            exact
          />
          <Route
            path="/tabs/transactions"
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
          <Route
            path="/tabs/settings/voucher-redemption-details"
            component={VoucherRedemptionDetailsPage}
            exact
          />
          <Route
            path="/tabs/settings/redeem-voucher-vendor"
            component={RedeemVoucherVendorPage}
            exact
          />
          <Route
            path="/tabs/settings/redeem-voucher-vendor/discount"
            component={RedeemDiscountVoucherPage}
            exact
          />
          <Route
            path="/tabs/settings/redeem-voucher-vendor/free"
            component={RedeemFreeVoucherPage}
            exact
          />
          <Redirect exact from="/tabs" to="/tabs/home" />
          <Redirect to="/not-found" />
        </Switch>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" mode="md" className="custom-tabbar">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          {/* <IonLabel>Home</IonLabel> */}
        </IonTabButton>
        {currentUser?.projects?.length > 0 && (
          <IonTabButton tab="transactions" href="/tabs/transactions">
            <IonIcon icon={swapHorizontalOutline} />
            {/* <IonLabel>Home</IonLabel> */}
          </IonTabButton>
        )}
        {currentUser?.projects?.length > 0 && (
          <IonTabButton tab="chargeBeneficiary" href="/tabs/charge-beneficiary">
            <IonIcon icon={qrCodeOutline} />
            {/* <IonLabel>Charge Beneficiary</IonLabel> */}
          </IonTabButton>
        )}
        {currentUser?.projects?.length > 0 && (
          <IonTabButton
            tab="referred-beneficiaries"
            href="/tabs/referred-beneficiaries"
          >
            <IonIcon icon={peopleOutline} />
            {/* <IonLabel>Profile</IonLabel> */}
          </IonTabButton>
        )}

        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={settingsOutline} />
          {/* <IonLabel>Settings</IonLabel> */}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
