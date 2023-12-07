import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import IndeterminateLoader from "@components/loaders/Indeterminate";
import LandingPage from "@pages/landing-screen";
import OTPPage from "@pages/otp";
import SelectProjectPage from "@pages/project-select";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import useAppStore from "@store/app";
import { useEffect } from "react";
import Tabs from "./tabrouter";

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
          {/* <PrivateRoute
            path="/tabs"
            component={Tabs}
            isAuthenticated={isAuthenticated}
          /> */}
          <Redirect exact from='/' to='/tabs' />
          <Route path='/tabs'>
            <Tabs isAuthenticated={isAuthenticated} />
          </Route>

          <Route exact path='/select-project' component={SelectProjectPage} />
          <Route exact path='/landing' component={LandingPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/restore-wallet' component={RestoreWalletPage} />

          <Route exact path='/otp' component={OTPPage} />
          <Redirect from='/' to='/landing' />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
