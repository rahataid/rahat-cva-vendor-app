export type IBeneficiary = {
  name?: string;
  phone?: number;
  gender?: GENDER;
  estimatedAge?: number;
  address?: string;
  status?: STATUS;
  beneficiaryType?: BENEFICIARY_TYPE;
  walletAddress?: string;
  token?: string;
  otpHash?: string;
  voucherType?: VOUCHER;
  createdAt: number;
};

export enum BENEFICIARY_TYPE {
  REFERRED = "REFERRED",
  ENROLLED = "ENROLLED",
}

export enum VOUCHER {
  FREE_VOUCHER = "FREE_VOUCHER",
  DISCOUNT_VOUCHER = "DISCOUNT_VOUCHER",
}

export enum STATUS {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}
