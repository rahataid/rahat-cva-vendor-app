export type IBeneficiary = {
  uuid?: string;
  name?: string;
  phone?: number;
  gender?: GENDER;
  estimatedAge?: ESTIMATED_AGE;
  address?: string;
  status?: STATUS;
  beneficiaryType?: BENEFICIARY_TYPE;
  walletAddress?: string;
  token?: string;
  otpHash?: string;
  voucherType?: VOUCHER;
  createdAt: number;
  voucherSymbol?: string;
  transactionHash?: string;
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

export enum ESTIMATED_AGE {
  "0-5" = "0-5",
  "6-10" = "6-10",
  "11-15" = "11-15",
  "16-20" = "16-20",
  "21-25" = "21-25",
  "26-30" = "26-30",
  "31-35" = "31-35",
  "36-40" = "36-40",
  "41-45" = "41-45",
  "46-50" = "46-50",
  "51-55" = "51-55",
  "56-60" = "56-60",
  "61-65" = "61-65",
  "66-70" = "66-70",
  "71-75" = "71-75",
  "76-80" = "76-80",
  "81-85" = "81-85",
  "86-90" = "86-90",
  "91-95" = "91-95",
  "86-10" = "86-10",
}

export type BENEFICIARY_VOUCHER_DETAILS = {
  FreeVoucherAddress?: string;
  FreeVoucherClaimStatus?: boolean;
  ReferredVoucherAddress?: string;
  ReferredVoucherClaimStatus?: boolean;
  beneficiaryAddress: string;
  id: string;
  __typename: string;
};
