import { useEffect } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import LandingPage from "@pages/landing-screen";
import OTPPage from "@pages/otp";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import useAppStore from "@store/app";
import PrivateRoute from "./private-routes";
import Tabs from "./tabrouter";
import SelectProjectPage from "@pages/select-project";
import NotFoundPage from "@sections/auth/not-found";

const Router = () => {
  const { initialize, isInitialized, isAuthenticated } = useAppStore(
    (state) => ({
      initialize: state.initialize,
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
    })
  );

  useEffect(() => {
    initialize();
  }, []);

  if (!isInitialized) {
    return <IndeterminateLoader />;
  }

  return (
    <IonReactRouter>
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/restore-wallet" component={RestoreWalletPage} />
        <Route exact path="/select-project" component={SelectProjectPage} />
        <Route exact path="/otp" component={OTPPage} />

        <PrivateRoute path="/tabs" component={Tabs} />

        {isAuthenticated ? (
          <Redirect exact from="/" to="/tabs/home" />
        ) : (
          <Redirect exact from="/" to="/landing" />
        )}

        <Route path="*" component={NotFoundPage} />
        <Redirect to="/landing" />
      </Switch>
    </IonReactRouter>
  );
};

export default Router;
