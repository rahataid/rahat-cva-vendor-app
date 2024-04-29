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

export enum DATE_SOURCE {
  BACKEND = "BACKEND",
  BLOCKCHAIN = "BLOCKCHAIN",
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

export type REFER_BENEFICIARY_DETAILS = {
  name: string;
  phone: string;
  gender: GENDER;
  estimatedAge: ESTIMATED_AGE;
  address: string;
  walletAddress?: string;
  code?: string;
  fullPhone?: string;
};

export type CreateBeneficiaryDto = {
  uuid: string; //UUID
  walletAddress?: string;
  referrerBeneficiary?: string; //UUID
  referrerVendor?: string; //UUID
  extras?: any;
  type?: BENEFICIARY_TYPE;
  age?: number;
};

export type REFERRED_BENEFICIARY_DETAILS = {
  id?: number;
  uuid?: string;
  walletAddress?: string;
  extras?: any;
  eyeCheckUp?: boolean;
  glassRequired?: boolean;
  beneficiariesReferred?: number;
  referrerBeneficiary?: string;
  referrerVendor?: string;
  type?: BENEFICIARY_TYPE;
};

export interface BENEFICIARY_DETAILS {
  id?: number;
  uuid?: string;
  gender?: GENDER;
  ageRange?: string;
  walletAddress?: string;
  birthDate?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  extras?: any;
  notes?: string;
  bankedStatus?: string;
  internetStatus?: string;
  phoneStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isVerified?: boolean;
  piiData?: {
    beneficiaryId?: number;
    name?: string;
    phone?: string;
    email?: any;
    extras?: any;
  };
}

export type REFER_RESULT_BENEFICIARY_DETAILS = {
  address: string;
  estimatedAge: string;
  gender: GENDER;
  name: string;
  phone: string;
  transactionHash: string;
  walletAddress: string;
  createdAt?: string;
};

export type PROJECT_DETAILS = {
  Project: {
    contractAddress?: string;
    createdAt?: string;
    deletedAt?: string;
    description?: string;
    extras?: any;
    id?: number;
    name?: string;
    status?: ANY;
    type?: string;
    updatedAt?: string;
    uuid?: string;
  };
  beneficiaryId?: string;
  createdAt?: string;
  deletedAt?: string;
  id?: number;
  projectId?: string;
  updatedAt?: string;
  uuid?: string;
};

export interface BENEFICIARY_REFERRAL_DETAILS extends BENEFICIARY_DETAILS {
  BeneficiaryProject?: PROJECT_DETAILS[] | [];
  beneficiariesReferred?: number;
}

export type BENEFICIARY_VOUCHER_STATUS_GRAPH = {
  FreeVoucherAddress: string | null;
  ReferredVoucherAddress: string | null;
  FreeVoucherClaimStatus: boolean | null;
  ReferredVoucherClaimStatus: boolean | null;
  beneficiaryAddress?: string;
  error?: any;
  id?: string;
  __typename?: string;
};

export type BENEFICIARY_VOUCHER_STATUS_CONTRACT = {
  0: string | null;
  1: string | null;
  2: boolean | null;
  3: boolean | null;
};
