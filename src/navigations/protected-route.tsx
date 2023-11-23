import { useHistory } from "react-router";
import { useIonRouter } from "@ionic/react";
import { getCurrentWalletInfo } from "@utils/sessionManager";
import { useState } from "react";
import useStorage from "@store/storage";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const { wallet, loading } = useStorage();

  console.log("wallet", wallet);
  console.log("history", history);

  if (loading) {
    return null;
  }

  if (!wallet) {
    console.log("protected routes -> /landing");
    history.replace("/landing");
  } else {
    history.replace("/tabs/home");
  }

  return <>{children}</>;
};
