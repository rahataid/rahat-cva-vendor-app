import {
  BENEFICIARY_DETAILS,
  BENEFICIARY_VOUCHER_DETAILS,
  CreateBeneficiaryDto,
  REFER_BENEFICIARY_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import { ITransactionItem } from "@types/transactions";
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
  voucher: BENEFICIARY_VOUCHER_DETAILS;
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
  redeemVoucher: ({
    voucherType,
    voucher,
    eyeCheckUp,
    glassStatus,
  }: RedeemVoucherProps) => Promise<any>;
  verifyOtp: (otp: string, beneficiaryAddress: string) => Promise<any>;
  updateStatus: ({
    voucherType,
    beneficiary,
    referralVoucherAddress,
    eyeCheckUp,
    glassStatus,
  }: UpdateStatusProps) => Promise<any>;
  referBeneficiaries: ({
    beneficiaryAddress,
    referredBeneficiaries,
    voucher,
  }: ReferProps) => Promise<any>;
  transferVoucher: ({ voucherType, amount }: TransferVoucher) => Promise<any>;
  getVendorVoucherRedemptionCount: (voucherType: VOUCHER) => Promise<number>;
  getVendorRedemptionList: () => Promise<any>;
  getReferredBeneficiaryList: () => Promise<any>;
  getReferredBeneficiaryDetails: (uuid: string) => Promise<any>;
  logoutTransactions: () => void;
};
