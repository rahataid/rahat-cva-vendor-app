import i18n from "@utils/translation-service";

const errorMessages: { [key: string]: string } = {
  "Network Error": i18n.t("GLOBAL.ERRORS.NETWORK_ERROR"),
  "Cannot read properties of null (reading 'uuid')": i18n.t(
    "GLOBAL.ERRORS.INVALID_MNEMONICS"
  ),
  "Duplicate entry in [phone] is not allowed.": i18n.t(
    "GLOBAL.ERRORS.PHONE_EXISTS"
  ),
  "Voucher not assigned to beneficiary": i18n.t(
    "GLOBAL.ERRORS.VOUCHER_NOT_ASSIGNED"
  ),
};

export const handleError = (error: any) => {
  const defaultErrorMessage = i18n.t("GLOBAL.ERRORS.DEFAULT");
  const errorFromMessage = error?.message;
  const errorFromResponse = error?.response?.data?.message;

  if (errorFromMessage && errorMessages.hasOwnProperty(errorFromMessage)) {
    return errorMessages[errorFromMessage];
  }

  if (errorFromResponse && errorMessages.hasOwnProperty(errorFromResponse)) {
    return errorMessages[errorFromResponse];
  }

  if (errorFromResponse) {
    return errorFromResponse;
  }

  return defaultErrorMessage;
};
