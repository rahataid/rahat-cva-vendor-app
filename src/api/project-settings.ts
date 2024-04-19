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
      staleTime: 60000,
      onSuccess: async (data: any) => {
        const { value: blockChainSettings } = findArrayElementByName({
          arr: data?.data?.data,
          name: "BLOCKCHAIN",
        });
        const { value: contractSettings } = findArrayElementByName({
          name: "CONTRACT",
          arr: data?.data?.data,
        });
        const { value: subgraphSettings } = findArrayElementByName({
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
          subGraph: subgraphSettings,
          admin: adminSettings,
        };
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
