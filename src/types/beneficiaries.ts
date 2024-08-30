export type IBeneficiary = {
  uuid?: string;
  name?: string;
  phone?: number;
  gender?: GENDER;
  estimatedAge?: ESTIMATED_AGE;
  address?: string;
  status?: STATUS;
  walletAddress?: string;
  token?: string;
  otpHash?: string;
  createdAt: number;
  voucherSymbol?: string;
  transactionHash?: string;
};

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
  eyeCheckUp?: boolean;
  glassRequired?: boolean;
  piiData?: {
    beneficiaryId?: number;
    name?: string;
    phone?: string;
    email?: any;
    extras?: any;
  };
}
