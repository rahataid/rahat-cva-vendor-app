import { useQuery, useQueryClient } from "@tanstack/react-query";
import AppSettingService from "../services/app-settings";
import useAppStore from "../store/app";

export const useAppSettings = () => {
  const queryClient = useQueryClient();
  const appStore = useAppStore((state) => state);

  const contracts = useQuery(
    ["contracts"],
    async () => {
      const { data } = await AppSettingService.getContracts();
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
      const { data } = await AppSettingService.getBlockchainSettings();
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
