export enum Status {
  NEW = "NEW",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export type ITransactionItem = {
  createdAt: string | number;
  amount: number | string | undefined;
  status: Status;
  isOffline: boolean;
  hash?: string;
  walletAddress?: string;
  phone?: string;
  vendorWalletAddress: string;
};
