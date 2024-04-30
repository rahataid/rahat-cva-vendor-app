import {
  IAllTransactions,
  ITransactionItem,
  Status,
  VoucherCurrencyDescription,
} from "../types/transactions";
import { ENV } from "../config";
import { FormInputType, checkObjType } from "../types/chargeBeneficiary";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  BENEFICIARY_VOUCHER_STATUS_CONTRACT,
  BENEFICIARY_VOUCHER_STATUS_GRAPH,
  DATE_SOURCE,
} from "../types/beneficiaries";
import { isAddress } from "ethers";
import { ProjectVoucherDetails, VoucherDescription } from "@types/graph";

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
  else if (ENV === "PROD") return `https://${text}.rahat.io/v1`;
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

export const formatDate = (
  timestamp: string,
  source: DATE_SOURCE = DATE_SOURCE.BLOCKCHAIN
) => {
  let date;
  if (source === DATE_SOURCE.BACKEND) date = new Date(timestamp);
  else if (source === DATE_SOURCE.BLOCKCHAIN) date = new Date(timestamp * 1000);

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

export const sortBeneficiariesByDate = (beneficiaries: IAllTransactions) => {
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

export const generateCurrentTimestamp = () => {
  const date = new Date();
  const timestampMilliseconds = date.getTime();
  const timestampSeconds = Math.floor(timestampMilliseconds / 1000);
  return timestampSeconds;
};

export const isVoucherClaimed = (
  beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS
): boolean => {
  if (
    beneficiaryVoucher?.FreeVoucherClaimStatus === true ||
    beneficiaryVoucher?.ReferredVoucherClaimStatus === true
  )
    return true;
  return false;
};

export const isVoucherAssigned = (
  beneficiaryVoucher: BENEFICIARY_VOUCHER_DETAILS
): boolean => {
  if (
    !beneficiaryVoucher?.FreeVoucherAddress &&
    !beneficiaryVoucher?.ReferredVoucherAddress
  )
    return false;
  return true;
};

export const randomDelay = (min, max) => {
  const randomMilliseconds = Math.floor(Math.random() * (max - min)) + min;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resolve the promise after the random delay
    }, randomMilliseconds);
  });
};

export const findArrayElementByName = ({ arr, name }: any): any => {
  return arr.find((el: any) => el.name.toUpperCase() === name.toUpperCase());
};

export const isValidEthereumAddressOnScan = (str: string) => {
  if (!str.startsWith("ethereum:")) {
    return false;
  }

  const address = str.substring(9);

  if (!isAddress(address)) return false;
  return true;
};

export const extractWalletAddressOnScan = (str: string) => {
  // Check if the string starts with "ethereum:"
  if (!str.startsWith("ethereum:")) {
    return null; // Not in the expected format
  }

  // Extract the address part after "ethereum:"
  const address = str.substring(9);

  // Return the extracted address
  return address;
};

export const randomPercentage = () => {
  return `${Math.floor(Math.random() * 50) + 50}%`;
};

export const categorizeVouchers = ({
  projectVoucher,
  freeVoucherAddress,
  discountVoucherAddress,
}: {
  projectVoucher: ProjectVoucherDetails;
  freeVoucherAddress: string;
  discountVoucherAddress: string;
}) => {
  const result: any = {};

  projectVoucher.voucherDescriptiona.forEach((voucher) => {
    if (voucher.id.toLowerCase() == freeVoucherAddress.toLowerCase()) {
      result.freeVoucher = {
        currency: voucher.currency,
        price: voucher.price,
      };
    } else if (
      voucher.id.toLowerCase() == discountVoucherAddress.toLowerCase()
    ) {
      result.discountVoucher = {
        currency: voucher.currency,
        price: voucher.price,
      };
    }
  });

  return result;
};

export const fixBeneficiaryVoucherResult = (
  contractResponse: BENEFICIARY_VOUCHER_STATUS_CONTRACT
): BENEFICIARY_VOUCHER_STATUS_GRAPH => {
  const beneficiaryVoucher = {
    FreeVoucherAddress: contractResponse["0"],
    ReferredVoucherAddress: contractResponse["1"],
    FreeVoucherClaimStatus: contractResponse["2"],
    ReferredVoucherClaimStatus: contractResponse["3"],
  };
  if (
    beneficiaryVoucher.FreeVoucherAddress ===
      "0x0000000000000000000000000000000000000000" &&
    beneficiaryVoucher.ReferredVoucherAddress ===
      "0x0000000000000000000000000000000000000000"
  ) {
    throw new Error("Voucher not assigned to beneficiary");
  } else if (
    beneficiaryVoucher.ReferredVoucherAddress !==
      "0x0000000000000000000000000000000000000000" &&
    beneficiaryVoucher.FreeVoucherAddress !==
      "0x0000000000000000000000000000000000000000"
  ) {
    beneficiaryVoucher.FreeVoucherAddress = null;
    beneficiaryVoucher.FreeVoucherClaimStatus = null;
  } else if (
    beneficiaryVoucher.FreeVoucherAddress ===
      "0x0000000000000000000000000000000000000000" &&
    beneficiaryVoucher.ReferredVoucherAddress !==
      "0x0000000000000000000000000000000000000000"
  ) {
    beneficiaryVoucher.FreeVoucherAddress = null;
    beneficiaryVoucher.FreeVoucherClaimStatus = null;
  } else if (
    beneficiaryVoucher.ReferredVoucherAddress ===
      "0x0000000000000000000000000000000000000000" &&
    beneficiaryVoucher.FreeVoucherAddress !==
      "0x0000000000000000000000000000000000000000"
  ) {
    beneficiaryVoucher.ReferredVoucherAddress = null;
    beneficiaryVoucher.ReferredVoucherClaimStatus = null;
  }
  return beneficiaryVoucher;
};
