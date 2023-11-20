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

import Router from "@navigations/router";

setupIonicReact();

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <Router />
        </AppContainer>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
