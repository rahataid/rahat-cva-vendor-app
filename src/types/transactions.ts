import { BENEFICIARY_TYPE, VOUCHER } from "./beneficiaries";

export enum EVENT_TYPE {
  "BENEFICIARY_REFERRED" = "Beneficiary Referred",
  "CLAIM_PROCESSED" = "Claim Processed",
}

export enum TRANSACTION_STATUS {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export type ITransactionItem = {
  beneficiary?: string;
  blockNumber?: string;
  blockTimestamp?: string;
  eventType?: string;
  id?: string;
  referrerBeneficiaries: string;
  referrerVendor?: string;
  transactionHash?: string;
  __typename?: string;
};

export type TransactionDetail = {
  status: TRANSACTION_STATUS;
  beneficiaryName: string;
  voucherType: VOUCHER;
  beneficiaryType: BENEFICIARY_TYPE;
  createdAt: number;
  transactionHash: string;
  voucherSymbol: string;
  phone: string;
};

export type MetaTxResponse = {
  blockHash?: string;
  blockNumber?: number;
  contractAddress?: string | null;
  cumulativeGasUsed?: string;
  from?: string;
  gasPrice?: string;
  gasUsed?: string;
  hash?: string;
  index?: number;
  logs?: any[];
  logsBloom?: string;
  status?: number;
  to?: string;
  _type?: string;
};

export type IBeneficiaryReferreds = {
  beneficiaryAddress?: string;
  blockNumber?: string;
  blockTimestamp?: string;
  eventType?: string;
  id?: string;
  referrerBeneficiaries?: string;
  referrerVendor?: string;
  transactionHash?: string;
  __typename?: string;
};

export type IProjectClaimProcesseds = {
  beneficiary?: string;
  blockNumber?: string;
  blockTimestamp?: string;
  eventType?: string;
  id?: string;
  token?: string;
  transactionHash?: string;
  vendor?: string;
  __typename?: string;
};

export type IClaimCreateds = any;

export type ITokenRedeems = any;

export type IAllTransactions = (
  | IBeneficiaryReferreds
  | IProjectClaimProcesseds
  | IClaimCreateds
  | ITokenRedeems
)[];

export type ITransactionsResponse = {
  beneficiaryReferreds?: IBeneficiaryReferreds[] | [];
  claimCreateds?: IClaimCreateds[] | [];
  projectClaimProcesseds?: IProjectClaimProcesseds[] | [];
  tokenRedeems?: ITokenRedeems[] | [];
};

export type IAllTransactionItem =
  | IBeneficiaryReferreds
  | IProjectClaimProcesseds
  | IClaimCreateds
  | ITokenRedeems;

export type UpdateStatusBeRes = {
  beneficiariesReferred?: number;
  createdAt?: string;
  deletedAt?: string;
  extras?: any;
  eyeCheckUp?: boolean;
  glassRequired?: boolean;
  id?: number;
  phoneNumber?: string | number;
  referrerBeneficiary?: string;
  referrerVendor?: string;
  status?: number;
  type?: BENEFICIARY_TYPE;
  uuid?: string;
  walletAddress?: string;
};

export type UpdateStatusContractRes = {
  txHash?: string;
};
export type UpdateStatusRes = UpdateStatusBeRes & UpdateStatusContractRes;
