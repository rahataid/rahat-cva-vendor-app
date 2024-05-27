import { CreateBeneficiaryDto, VOUCHER } from "@types/beneficiaries";
import { ITransactionItem } from "@types/transactions";
import { AppStoreType } from "./app";

export type TransactionStoreType = TransactionStateType &
  TransactionActionsType;

export type TransactionStateType = {
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
  triggerUpdateState: boolean;
};

export type addToProjectPayload = {
  action: string;
  payload: CreateBeneficiaryDto;
};

export type TransactionActionsType = {
  referredAppStoreState: () => AppStoreType;
  triggerUpdate: () => void;
  verifyOtp: (otp: string, beneficiaryAddress: string) => Promise<any>;
  getBeneficiaryDetailsByUuid: (uuid: string) => Promise<any>;
  getBeneficiaryDetailsByWallet: (walletAddress: string) => Promise<any>;
  getBeneficiaryDetailsByPhone: (phone: string) => Promise<any>;
  logoutTransactions: () => void;
  chargeBeneficiary: (walletAddress: string, amount: number) => Promise<any>;
  getBeneficiaryClaims: (walletAddress: string) => Promise<any>;
  getClaimCount: () => Promise<number>;
};
