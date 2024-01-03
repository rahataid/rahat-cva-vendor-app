import { AxiosInstance } from "axios";
import { axiosInstance, endpoints } from "../utils/axios";

interface BlockchainSettingsApiResponse extends AxiosInstance {
  data: {
    value: any;
  };
}

const ProjectSettingService = {
  getBlockchainSettings: (): Promise<BlockchainSettingsApiResponse> =>
    axiosInstance.get(endpoints.projectSettings.blockchain),
  getContracts: () => axiosInstance.get(endpoints.projectSettings.contracts),
  getSettings: (name: any) =>
    axiosInstance.get(endpoints.projectSettings.settings(name)),
};

export default ProjectSettingService;
