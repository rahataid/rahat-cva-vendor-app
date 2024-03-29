import { axiosInstance, endpoints } from "../utils/axios";

const BeneficiariesService = {
  getByPhone: (phone: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByPhone(phone)),
  getByWalletAddress: (walletAddress: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByPhone(walletAddress)),
};

export default BeneficiariesService;
