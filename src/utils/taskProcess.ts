import BeneficiariesService from "@services/beneficiaries";

const taskProcess = {
  chargeBeneficiaryPhone: {
    callFn: (walletAddress: any, data: any) =>
      BeneficiariesService.chargeBeneficiary(walletAddress, data),
  },
};

export default taskProcess;
