import { axiosInstance, endpoints } from "../utils/axios";

const BeneficiariesService = {
  list: (params?: any) =>
    axiosInstance.get(endpoints.beneficiaries.list, { params }),
  getByPhone: (phone: string) =>
    axiosInstance.get(endpoints.beneficiaries.list, { params: { phone } }),
  getByWalletAddress: (walletAddress: string) =>
    axiosInstance.get(endpoints.beneficiaries.list, {
      params: { walletAddress },
    }),

  chargeBeneficiary: (phone: string, data: any) => {
    return axiosInstance.post(endpoints.beneficiaries.charge(phone), data);
  },
};

export default BeneficiariesService;
