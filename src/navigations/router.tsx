import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import { RequireAuth } from "./protected-route";
import Tabs from "./tabrouter";
import ChargeTokenPage from "@pages/charge-token";
import LandingPage from "@pages/landing-screen";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import OTPPage from "@pages/otp";

const Router = () => {
  return (
    <IonReactRouter>
      {/* Public Routes */}

      <Route exact path="/landing" component={LandingPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/restore-wallet" component={RestoreWalletPage} />
      <Route exact path="/otp" component={OTPPage} />
      {/* <Route exact path="/">
        <Redirect to="/landing" />
      </Route> */}

      {/* Private Routes */}
      <RequireAuth>
        <Route path="/tabs">
          <Tabs />
        </Route>
      </RequireAuth>
    </IonReactRouter>
  );
};

export default Router;
