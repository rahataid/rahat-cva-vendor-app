export enum Status {
  NEW,
  OFFLINE,
  ONLINE,
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
