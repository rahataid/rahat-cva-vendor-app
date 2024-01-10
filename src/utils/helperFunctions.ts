import { ITransactionItem, Status } from "../types/transactions";

export const isObjectInArray = (arr: any, obj: any, key: any) => {
  return arr.find((el: any) => el[key] === obj[key]) !== undefined;
};

export const findObjectInArray = (arr: any, obj: any, key: any) => {
  return arr.find((el: any) => el[key] === obj[key]);
};

export const setTransactionStatus = (
  transactions: ITransactionItem[],
  offlineTransactions: ITransactionItem[],
  status: Status,
  response?: any
) => {
  if (status === "SUCCESS")
    offlineTransactions.forEach((el: ITransactionItem) => {
      el.status = status;
      el.hash = response?.hash;
    });
  else
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

export const cropString = (str: string, cropLength: number = 5) => {
  return str.length > 2 * cropLength
    ? str.substring(0, cropLength) +
        "..." +
        str.substring(str.length - cropLength)
    : str;
};
