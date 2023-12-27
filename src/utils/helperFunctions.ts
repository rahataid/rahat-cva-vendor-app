import { ITransactionItem, Status } from "../types/transactions";

export const isObjectInArray = (arr: any, obj: any) => {
  return arr.find((el: any) => el.phone === obj.phone) !== undefined;
};

export const findObjectInArray = (arr: any, obj: any) => {
  return arr.find((el: any) => el.phone === obj.phone);
};

export const setTransactionStatus = (
  transactions: ITransactionItem[],
  offlineTransactions: ITransactionItem[],
  status: Status
) => {
  offlineTransactions.forEach((el: ITransactionItem) => {
    el.status = status;
  });

  const updatedArrayIds = offlineTransactions.map((obj) => obj.createdAt);

  const updatedTransactions = transactions.map((obj) => {
    if (updatedArrayIds.includes(obj.createdAt)) {
      return offlineTransactions.find(
        (updatedObj) => updatedObj.createdAt === obj.createdAt
      );
    } else {
      return obj;
    }
  });

  return updatedTransactions;
};
