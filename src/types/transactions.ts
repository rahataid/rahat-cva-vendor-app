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
  createdAt: number;
  transactionHash: string;
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
