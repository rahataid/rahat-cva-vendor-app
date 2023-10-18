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
};

export default AppSettingService;
