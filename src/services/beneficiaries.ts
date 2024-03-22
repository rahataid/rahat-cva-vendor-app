import { axiosInstance, endpoints } from "../utils/axios";

const BeneficiariesService = {
  getByPhone: (phone: string) =>
    axiosInstance.get(endpoints.beneficiaries.getByPhone(phone)),
};

export default BeneficiariesService;
