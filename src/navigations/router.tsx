import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import IndeterminateLoader from "@components/loaders/Indeterminate";
import InternetAccessCenter from "@pages/internet-center";
import LandingPage from "@pages/landing-screen";
import OTPPage from "@pages/otp";
import SelectProjectPage from "@pages/project-select";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import useAppStore from "@store/app";
import { axiosInstance } from "@utils/axios";
import { useEffect } from "react";
import PrivateRoute from "./private-routes";
import Tabs from "./tabrouter";

const Router = () => {
  const {
    initialize,
    isInitialized,
    isAuthenticated,
    appSettings,
    chainData,
    internetAccess,
  } = useAppStore((state) => ({
    initialize: state.initialize,
    isInitialized: state.isInitialized,
    appSettings: state.appSettings,
    isAuthenticated: state.isAuthenticated,
    chainData: state.chainData,
    internetAccess: state.internetAccess,
  }));

  useEffect(() => {
    initialize();
    if (appSettings?.baseUrl) {
      axiosInstance.defaults.baseURL = appSettings.baseUrl;
    }
  }, [initialize, appSettings]);

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
        <IonRouterOutlet
        // style={
        //   !internetAccess
        //     ? {
        //         marginTop: "40px",
        //       }
        //     : {}
        // }
        >
          <Switch>
            <Redirect exact from='/' to='/tabs' />
            <PrivateRoute path='/tabs' component={Tabs} />
            <Route exact path='/select-project' component={SelectProjectPage} />
            <Route exact path='/landing' component={LandingPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/restore-wallet' component={RestoreWalletPage} />
            <Route exact path='/otp' component={OTPPage} />
            <PrivateRoute
              exact
              path='/internet-center'
              component={InternetAccessCenter}
            />
            <Redirect from='/' to='/landing' />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </>
  );
};

export default Router;
