import { axiosInstance, endpoints } from "../utils/axios";

const BeneficiariesService = {
  list: (params?: any) =>
    axiosInstance.get(endpoints.beneficiaries.list, { params }),
  getByPhone: (phone: string) =>
    axiosInstance.get(endpoints.beneficiaries.list, { params: { phone } }),
};

export default BeneficiariesService;
