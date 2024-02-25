import { BENEFICIARY_TYPE, VOUCHER } from "./beneficiaries";

export enum TRANSACTION_STATUS {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export type ITransactionItem = {
  projectName: string;
  createdAt: string;
  type: BENEFICIARY_TYPE;
};

export type TransactionDetail = {
  status: TRANSACTION_STATUS;
  beneficiaryName: string;
  voucherType: VOUCHER;
  beneficiaryType: BENEFICIARY_TYPE;
  createdAt: string;
  transactionHash: string;
  voucherSymbol: string;
  phone: string;
};
