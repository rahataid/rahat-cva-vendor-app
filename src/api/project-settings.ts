import { useQuery } from "@tanstack/react-query";
import useAppStore from "../store/app";
import ProjectsService from "../services/projects";
import { findArrayElementByName } from "../utils/helperFunctions";

export function useProjectSettings(): any {
  const {
    currentUser,
    projectSettings: storeProjectSettings,
    setProjectSettings,
  } = useAppStore.getState();
  console.log(
    "PROJECT SETTINGS FETCH ENABLED",
    currentUser?.projects?.length > 0 &&
      (!storeProjectSettings?.contracts ||
        !storeProjectSettings?.network ||
        !storeProjectSettings?.subGraph ||
        !storeProjectSettings?.admin)
  );
  const {
    data: projectSettings,
    isLoading,
    error,
    isFetching,
  } = useQuery(
    ["settings", currentUser],
    async () => {
      const res = await ProjectsService.actions(
        currentUser?.projects[0]?.uuid,
        {
          action: "settings.list",
          payload: {},
        }
      );
      return res;
    },
    {
      enabled:
        currentUser?.projects?.length > 0 &&
        (!storeProjectSettings?.contracts ||
          !storeProjectSettings?.network ||
          !storeProjectSettings?.subGraph ||
          !storeProjectSettings?.admin),
      staleTime: 0,
      onSuccess: async (data: any) => {
        console.log("==============>", data);
        const { value: blockChainSettings } = findArrayElementByName({
          arr: data?.data?.data,
          name: "BLOCKCHAIN",
        });
        const { value: contractSettings } = findArrayElementByName({
          name: "CONTRACT",
          arr: data?.data?.data,
        });
        const {
          value: { url: subgraphSettings },
        } = findArrayElementByName({
          name: "SUBGRAPH_URL",
          arr: data?.data?.data,
        });
        const { value: adminSettings } = findArrayElementByName({
          name: "ADMIN",
          arr: data?.data?.data,
        });
        const projectSettings = {
          contracts: contractSettings,
          network: blockChainSettings,
          subGraph: {
            url: subgraphSettings,
          },
          admin: adminSettings,
        };
        console.log("PROJECT SETTINGS======================", projectSettings);
        await setProjectSettings(projectSettings);
        return projectSettings;
      },
    }
  );

  return {
    data: projectSettings,
    isLoading,
    error,
    isFetching,
  };
}
