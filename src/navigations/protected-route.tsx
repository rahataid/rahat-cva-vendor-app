import { Redirect, useHistory } from "react-router";
import { IonProgressBar, useIonRouter } from "@ionic/react";
import { getCurrentWalletInfo } from "@utils/sessionManager";
import { useEffect, useState } from "react";
import useStorage from "@store/storage";
import useAppStore from "@store/app";
import IndeterminateLoader from "@components/loaders/Indeterminate";

type PropTypes = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

const ProtectedRoute: React.FC<PropTypes> = ({ children, isAuthenticated }) => {
  const history = useHistory();

  if (!isAuthenticated) {
    history.replace("/landing");
  } else return <>{children}</>;
};

export default ProtectedRoute;
