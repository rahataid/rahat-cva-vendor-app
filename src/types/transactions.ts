import { BENEFICIARY_TYPE, VOUCHER } from "./beneficiaries";

export enum TRANSACTION_STATUS {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export type ITransactionItem = {
  beneficiaryAddress?: string;
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
