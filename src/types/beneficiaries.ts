export type IBeneficiary = {
  name: string;
  walletAddress: string;
  token: string;
  phone?: string;
  otpHash: string;
};

export enum BENEFICIARY_TYPE {
  REFERRED = "REFERRED",
  ENROLLED = "ENROLLED",
}
