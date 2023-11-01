import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { qrCode, home, person } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Home from "./pages/home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { useState } from "react";
import AppContainer from "./app-container";
import "./theme/variables.css";

import ChargeTokenPage from "./pages/charge-token";
import LandingPage from "@pages/landing-screen";
import RegisterPage from "@pages/register";
import RestoreWalletPage from "@pages/restore-wallet";
import OTPPage from "@pages/otp";
import ProfilePage from "@pages/profile";

setupIonicReact();

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <IonApp>
      <IonReactRouter>
        <QueryClientProvider client={queryClient}>
          <AppContainer>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/charge-token">
                  <ChargeTokenPage />
                </Route>
                <Route exact path="/register">
                  <RegisterPage />
                </Route>
                <Route exact path="/restore-wallet">
                  <RestoreWalletPage />
                </Route>
                <Route exact path="/otp">
                  <OTPPage />
                </Route>
                <Route exact path="/landing">
                  <LandingPage />
                </Route>
                <Route exact path="/profile">
                  <ProfilePage />
                </Route>

                <Route exact path="/">
                  <Redirect to="/landing" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="charge-token" href="/charge-token">
                  <IonIcon aria-hidden="true" icon={qrCode} />
                  <IonLabel>Charge</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                  <IonIcon aria-hidden="true" icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </AppContainer>
        </QueryClientProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
