import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import IndeterminateLoader from "@components/loaders/Indeterminate";
import LandingPage from "@pages/landing-screen";
import OTPPage from "@pages/otp";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import useAppStore from "@store/app";
import { useEffect } from "react";
import PrivateRoute from "./private-routes";
import Tabs from "./tabrouter";
import SelectProjectPage from "@pages/select-project";

const Router = () => {
  console.log("ROUTER COMPONENT");
  const { initialize, isInitialized } = useAppStore((state) => ({
    initialize: state.initialize,
    isInitialized: state.isInitialized,
    projectSettings: state.projectSettings,
    isAuthenticated: state.isAuthenticated,
    chainData: state.chainData,
  }));

  useEffect(() => {
    initialize();
  }, []);

  if (!isInitialized) {
    return <IndeterminateLoader />;
  }

  return (
    <>
      {/* {!internetAccess && (
        <IonTitle
          style={{
            textAlign: "center",
            fontWeight: "600",
            color: "#fff",
            backgroundColor: "#3880ff",
            display: "block",
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            padding: "5px 0",
            zIndex: 9999,
          }}>
          Working Offline
        </IonTitle>
      )} */}
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Redirect exact from="/" to="/landing" />

            <Route exact path="/select-project" component={SelectProjectPage} />
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/restore-wallet" component={RestoreWalletPage} />
            <Route exact path="/otp" component={OTPPage} />

            <PrivateRoute path="/tabs" component={Tabs} />

            <Redirect to="/landing" />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </>
  );
};

export default Router;
