import React from "react";
import { useAppSettings } from "./api/app";
import useAppStore from "./store/app";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const appSettings = useAppSettings();
  const appStore = useAppStore();

  console.log("appSettings", appStore);

  return children;
};

export default AppContainer;
