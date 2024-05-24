import {
  BENEFICIARY_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
  BENEFICIARY_VOUCHER_STATUS_GRAPH,
  CreateBeneficiaryDto,
  REFER_BENEFICIARY_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import { ITransactionItem, UpdateStatusRes } from "@types/transactions";
import { AppStoreType } from "./app";

export type TransactionStoreType = TransactionStateType &
  TransactionActionsType;

export type TransactionStateType = {
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
  triggerUpdateState: boolean;
};

export type ReferProps = {
  beneficiaryAddress: string;
  referredBeneficiaries: REFER_BENEFICIARY_DETAILS[];
  beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS;
  beneficiaryDetails: BENEFICIARY_DETAILS;
};

export type UpdateStatusProps = {
  voucherType: VOUCHER;
  beneficiary: BENEFICIARY_DETAILS;
  referralVoucherAddress?: string;
  eyeCheckUp: boolean;
  glassStatus: boolean;
};

export type RedeemVoucherProps = {
  beneficiary: BENEFICIARY_DETAILS;
  voucher?: BENEFICIARY_VOUCHER_DETAILS;
  voucherType: VOUCHER;
  eyeCheckUp: boolean;
  glassStatus: boolean;
};

export type addToProjectPayload = {
  action: string;
  payload: CreateBeneficiaryDto;
};

export type TransferVoucher = {
  voucherType: VOUCHER;
  amount: number;
};

export type TransactionActionsType = {
  referredAppStoreState: () => AppStoreType;
  triggerUpdate: () => void;
  fetchBeneficiaryVoucherDetails: (
    walletAddress: string
  ) => Promise<BENEFICIARY_VOUCHER_STATUS_GRAPH>;
  verifyOtp: (otp: string, beneficiaryAddress: string) => Promise<any>;
  getBeneficiaryDetailsByUuid: (uuid: string) => Promise<any>;
  getBeneficiaryDetailsByWallet: (walletAddress: string) => Promise<any>;
  getBeneficiaryDetailsByPhone: (phone: string) => Promise<any>;
  logoutTransactions: () => void;
  chargeBeneficiary: (walletAddress: string, amount: number) => Promise<any>;
  getBeneficiaryClaims: (walletAddress: string) => Promise<any>;
  getClaimCount: () => Promise<number>;
};
