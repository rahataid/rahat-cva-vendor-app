import { ITransactionItem, Status } from "../types/transactions";
import { ENV } from "../config";
import {
  FormInputType,
  checkObjType,
  formDataType,
} from "../types/chargeBeneficiary";
import { IBeneficiary } from "@types/beneficiaries";

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
  if (ENV === "DEV") return `http://${text}/v1`;
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

// export const formatDate = (timestamp: string) => {
//   const date = new Date(timestamp);
//   // Get day, month, year, hours, minutes, and seconds
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");
//   const ampm = date.getHours() >= 12 ? "PM" : "AM";

//   // Construct the formatted date string
//   const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
//   return formattedDate;
// };

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp * 1000);

  // Get the components of the date
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Form the date string
  const formattedDate = `${day}/${month}/${year} ${hours12}:${minutes}:${seconds} ${period}`;
  return formattedDate;
};

export const sortBeneficiariesByDate = (beneficiaries: ITransactionItem[]) => {
  const beneficiariesByDate = {};

  beneficiaries.forEach((beneficiary) => {
    // Convert the createdAt timestamp to a Date object
    const createdAtDate = new Date(beneficiary.blockTimestamp * 1000);
    // Get the date in 'dd/mm/yyyy' format
    const dateString = createdAtDate.toLocaleDateString("en-GB");

    // If the date key doesn't exist in the beneficiariesByDate object, create it
    if (!beneficiariesByDate[dateString]) {
      beneficiariesByDate[dateString] = [];
    }

    // Push the beneficiary to the array corresponding to its date
    beneficiariesByDate[dateString].push(beneficiary);
  });

  return beneficiariesByDate;
};
