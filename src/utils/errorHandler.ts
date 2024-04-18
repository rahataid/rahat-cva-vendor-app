const errorMessages: { [key: string]: string } = {
  "Network Error": "Invalid project URL",
  "Cannot read properties of null (reading 'uuid')": "Invalid vendor mnemonics",
  "Duplicate entry in [phone] is not allowed.": "Phone number already exists",
};

export const handleError = (error: any) => {
  const defaultErrorMessage = "Something went wrong! Try again later.";
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
