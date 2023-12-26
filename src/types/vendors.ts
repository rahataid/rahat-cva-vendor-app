export type IAddVendorPayload = {
  name: string;
  phone: string;
};

export type ISyncTransactionsPayload = {
  message: any;
  signedMessage: string;
};
