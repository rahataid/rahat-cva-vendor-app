import { AxiosInstance } from "axios";
import { axiosInstance, endpoints } from "../utils/axios";

interface BlockchainSettingsApiResponse extends AxiosInstance {
  data: {
    value: any;
  };
}

const AppSettingService = {
  getBlockchainSettings: (): Promise<BlockchainSettingsApiResponse> =>
    axiosInstance.get(endpoints.appSettings.blockchain),
  getContracts: () => axiosInstance.get(endpoints.appSettings.contracts),
  getSettings: (name: any) =>
    axiosInstance.get(endpoints.appSettings.settings(name)),
};

export default AppSettingService;
