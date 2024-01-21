import { useEffect } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import LandingPage from "@pages/landing-screen";
import OTPPage from "@pages/otp";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
// import useAppStore from "@store/app";
import PrivateRoute from "./private-routes";
import Tabs from "./tabrouter";
import SelectProjectPage from "@pages/select-project";
import NotFoundPage from "@sections/auth/not-found";
import { IonRouterOutlet } from "@ionic/react";
import useAppStore from "@store/app";
import useBeneficiaryStore from "@store/beneficiaries";
import useTransactionsStore from "@store/transactions";

const Router = () => {
  const {
    chainData,
    isAuthenticated,
    isInitialized,
    setChainData,
    initialize,
  } = useAppStore();
  const { initializeTransactions } = useTransactionsStore();
  // console.log({ chainData, isAuthenticated, setChainData });

  // useEffect(() => {
  //   // setChainData({
  //   //   allowance: 2222,
  //   //   disbursed: 2,
  //   //   distributed: 3,
  //   //   isVendorApproved: true,
  //   // });
  //   initialize();
  // }, []);

  useEffect(() => {
    initialize();
    initializeTransactions();
  }, []);

  useEffect(() => console.log("ROUTER"));

  if (!isInitialized) {
    return <IndeterminateLoader />;
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
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
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
