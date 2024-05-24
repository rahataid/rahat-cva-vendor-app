import { useEffect } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import IndeterminateLoader from "@components/loaders/Indeterminate";
import LandingPage from "@pages/landing-screen";
import OTPPage from "@pages/otp";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import PrivateRoute from "./private-routes";
import Tabs from "./tabrouter";
import SelectProjectPage from "@pages/select-project";
import NotFoundPage from "@sections/auth/not-found";
import { IonRouterOutlet } from "@ionic/react";
import useAppStore from "@store/app";
import { useTransactionsRehydrate } from "@hooks/use-transactions-rehydrate";
import ResetPage from "@pages/reset";
import ScannerPage from "@pages/scanner";
import TransactionResultPage from "@pages/transaction-result";
import ChargeBeneficiaryAmountPage from "@pages/charge-beneficiary-amount";

const Router = () => {
  const { isAuthenticated, isInitialized, initialize } = useAppStore();

  useTransactionsRehydrate();

  useEffect(() => {
    initialize();
  }, []);

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
          <Route exact path="/reset" component={ResetPage} />

          <PrivateRoute
            path="/charge-beneficiary-amount"
            component={ChargeBeneficiaryAmountPage}
          />
          <PrivateRoute path="/tabs" component={Tabs} />
          <PrivateRoute path="/scanner" component={ScannerPage} />

          <PrivateRoute
            path="/transaction-result"
            component={TransactionResultPage}
            exact
          />

          {isAuthenticated ? (
            <Redirect exact from="/" to="/tabs/home" />
          ) : (
            <Redirect exact from="/" to="/landing" />
          )}

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
