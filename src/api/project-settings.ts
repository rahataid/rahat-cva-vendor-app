import { useQuery } from "@tanstack/react-query";
import useAppStore from "../store/app";
import ProjectsService from "../services/projects";
import { findArrayElementByName } from "../utils/helperFunctions";

export function useProjectSettings(): any {
  const { currentUser, setProjectSettings } = useAppStore.getState();

  const { data, isLoading, error } = useQuery(
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
      enabled: currentUser?.projects?.length > 0,
      staleTime: 60000,
      onSuccess: async (data: any) => {
        console.log("GET PROJECT SETTINGS RESPONSE", data?.data?.data);
        const { value: blockChainSettings } = findArrayElementByName({
          arr: data?.data?.data,
          name: "BLOCKCHAIN",
        });
        const { value: contractSettings } = findArrayElementByName({
          name: "CONTRACT",
          arr: data?.data?.data,
        });
        const projectSettings = {
          baseUrl: data?.projectURL,
          contracts: contractSettings,
          network: blockChainSettings,
        };
        await setProjectSettings(projectSettings);
      },
    }
  );

  return {
    isLoading,
    error,
  };
}
