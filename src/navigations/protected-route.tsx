import { useHistory } from "react-router";
import { IonProgressBar, useIonRouter } from "@ionic/react";
import { getCurrentWalletInfo } from "@utils/sessionManager";
import { useEffect, useState } from "react";
import useStorage from "@store/storage";
import useAppStore from "@store/app";
import IndeterminateLoader from "@components/loaders/Indeterminate";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const { wallet, loading } = useStorage();

  console.log("wallet", wallet);
  console.log("history", history);

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
    console.log("NO INITIALIZED");
    return (
      <>
        <IndeterminateLoader></IndeterminateLoader>
      </>
    );
  }

  if (!isAuthenticated) {
    console.log("protected routes -> /landing");
    history.replace("/landing");
  } else {
    history.replace("/tabs/home");
  }

  return <>{children}</>;
};
