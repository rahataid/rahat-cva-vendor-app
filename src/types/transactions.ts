import { BENEFICIARY_TYPE, VOUCHER } from "./beneficiaries";

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
