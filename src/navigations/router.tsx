import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import { RequireAuth } from "./protected-route";
import Tabs from "./tabrouter";
import ChargeTokenPage from "@pages/charge-token";
import LandingPage from "@pages/landing-screen";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import OTPPage from "@pages/otp";
import useAppStore from "@store/app";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import { useEffect } from "react";
import PrivateRoute from "./private-routes";

const Router = () => {
  const { initialize, isInitialized, isAuthenticated } = useAppStore(
    (state) => ({
      initialize: state.initialize,
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
    })
  );

  useEffect(() => {
    console.log({ initialize, isInitialized, isAuthenticated });
    (async () => await initialize())();
  }, [initialize, isAuthenticated]);

  if (!isInitialized)
    return (
      <>
        <IndeterminateLoader></IndeterminateLoader>
      </>
    );

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Redirect exact from="/" to="/tabs" />
          <PrivateRoute
            path="/tabs"
            component={Tabs}
            isAuthenticated={isAuthenticated}
          />
          <Route exact path="/landing" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/restore-wallet" component={RestoreWalletPage} />
          <Route exact path="/otp" component={OTPPage} />
          <Redirect from="/" to="/landing" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
