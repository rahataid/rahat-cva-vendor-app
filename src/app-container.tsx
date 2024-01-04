import React from "react";
import { useProjectSettings } from "./api/project";
import useAppStore from "./store/app";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const projectSettings = useProjectSettings();
  const appStore = useAppStore();

  // console.log("projectSettings", projectSettings);
  // console.log("appstore", appStore);

  return children;
};

export default AppContainer;
