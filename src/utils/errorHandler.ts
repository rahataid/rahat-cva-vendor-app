import i18n from "@utils/translation-service";
import { extractNumbersFromString } from "./helperFunctions";

const getErrorMessages = (): { [key: string]: string } => ({
  "Network Error": i18n.t("GLOBAL.ERRORS.NETWORK_ERROR"),
  "Cannot read properties of null (reading 'uuid')": i18n.t(
    "GLOBAL.ERRORS.VENDOR_DOESNT_EXIST"
  ),
  "Duplicate entry in [phone] is not allowed.": i18n.t(
    "GLOBAL.ERRORS.PHONE_EXISTS"
  ),
  "Voucher not assigned to beneficiary": i18n.t(
    "GLOBAL.ERRORS.VOUCHER_NOT_ASSIGNED"
  ),
  "Phone number should be unique": i18n.t("GLOBAL.ERRORS.PHONE_EXISTS"),
  "Invalid Beneficiary": i18n.t("GLOBAL.ERRORS.INVALID_BENEFICIARY"),
  "invalid mnemonic word at index": i18n.t("GLOBAL.ERRORS.INVALID_MNEMONICS"),
  "Invalid ethereum wallet address": i18n.t(
    "GLOBAL.ERRORS.INVALID_ETHEREUM_ADDRESS"
  ),
});

export const handleError = (error: any) => {
  const defaultErrorMessage = i18n.t("GLOBAL.ERRORS.DEFAULT");
  const errorFromMessage = error?.message;
  const errorFromResponse = error?.response?.data?.message;
  const errorMessages = getErrorMessages();

  if (errorFromMessage) {
    for (const key in errorMessages) {
      if (errorFromMessage.startsWith(key)) {
        return errorMessages[key];
      }
      if (errorFromMessage.includes(key)) {
        if (key === "Phone number should be unique") {
          const { numbers } = extractNumbersFromString(errorFromMessage);
          return `${numbers.join(", ")} ${errorMessages[key]}`;
        }
      }
    }
  }

  if (errorFromResponse && errorMessages.hasOwnProperty(errorFromResponse)) {
    return errorMessages[errorFromResponse];
  }

  if (errorFromResponse) {
    return errorFromResponse;
  }

  return defaultErrorMessage;
};
