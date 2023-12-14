import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProjectSettingService from "../services/project-settings";
import useAppStore from "../store/app";

export const useProjectSettings = () => {
  const queryClient = useQueryClient();
  const appStore = useAppStore((state) => state);

  const contracts = useQuery(
    ["contracts"],
    async () => {
      const { data } = await ProjectSettingService.getContracts();
      return data?.value;
    },
    {
      onSuccess: (data) => {
        appStore.setContracts(data);
      },
    }
  );

  const blockchain = useQuery(
    ["blockchain"],
    async () => {
      const { data } = await ProjectSettingService.getBlockchainSettings();
      return data?.value;
    },
    {
      onSuccess: (data) => {
        appStore.setBlockchain(data);
      },
    }
  );

  return {
    contracts,
    blockchain,
  };
};
