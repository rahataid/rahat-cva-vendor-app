export enum Status {
  NEW,
  SUCCESS,
  FAIL,
}

export type ITransactionItem = {
  createdAt: string;
  amount: string;
  status: Status;
  isOffline: boolean;
  hash?: string;
  walletAddress?: string;
  phone?: string;
};
