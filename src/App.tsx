import { IonApp, setupIonicReact } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import { useEffect, useState } from "react";

import Router from "@navigations/router";
import "./theme/global.scss";
import { GraphQueryProvider } from "@contexts/graph-query";
import { GraphQuery } from "@rahataid/el-subgraph";
import useAppStore from "@store/app";

setupIonicReact();

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <GraphQueryProvider>
          <Router />
        </GraphQueryProvider>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
