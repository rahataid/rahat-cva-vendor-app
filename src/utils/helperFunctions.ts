import { ITransactionItem, Status } from "../types/transactions";
import { ENV } from "../config";
import {
  FormInputType,
  checkObjType,
  formDataType,
} from "../types/chargeBeneficiary";

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

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const fixProjectUrl = (text: string) => {
  if (ENV === "DEV") return `http://${text}/api/v1`;
  else if (ENV === "PROD") return `https://${text}.rahat.io/api/v1`;
};

export const validateTokenAmount = (
  selectedBeneficiary: any,
  formData: checkObjType,
  key: FormInputType.phone | FormInputType.walletAddress,
  transactions: ITransactionItem[]
) => {
  const currentBeneficiaryTransactions = transactions.filter(
    (el: any) => el[key] === formData[key]
  );

  let totalAmount = 0;
  currentBeneficiaryTransactions.forEach((el) => (totalAmount += +el.amount));

  if (formData.token) totalAmount += +formData.token;

  if (totalAmount > +selectedBeneficiary.token) return false;
  return true;
};
