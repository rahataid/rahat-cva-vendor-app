import BeneficiariesService from "@services/beneficiaries";

const taskProcess = {
  chargeBeneficiaryPhone: {
    callFn: (phone: any, data: any) =>
      BeneficiariesService.chargeBeneficiary(phone, data),
  },
};

export default taskProcess;
