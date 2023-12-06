export enum Status {
  NEW,
  PENDING,
  SUCCESS,
  FAIL,
}

export type TransactionItem = {
  createdAt: Date;
  amount: string;
  status: Status;
  isOffline: boolean;
  hash?: string;
  walletAddress?: string;
  phone?: string;
};
