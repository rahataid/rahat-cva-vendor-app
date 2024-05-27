import { axiosInstance, endpoints } from "../utils/axios";

const BeneficiariesService = {
  getByPhone: (phone: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByPhone(phone)),
  getByWallet: (walletAddress: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByWallet(walletAddress)),
  getByUuid: (uuid: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByUuid(uuid)),
};

export default BeneficiariesService;
