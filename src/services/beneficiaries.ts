import { axiosInstance, endpoints } from "../utils/axios";

const BeneficiariesService = {
  getByPhone: (phone: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByPhone(phone)),
  getByWallet: (walletAddress: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByWallet(walletAddress)),
};

export default BeneficiariesService;
