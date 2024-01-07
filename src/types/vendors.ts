export type IAddVendorPayload = {
  name: string;
  phone: string;
};

export type ISyncTransactionsPayload = {
  message: any;
  signedMessage: string;
};

export type IOnlineVendorTx = {
  vendorAddress: string;
  beneficiaryAddress: string;
  amount: string;
};

export type IOnlineVendorTxVerify = {
  vendorAddress: string;
  beneficiaryAddress: string;
  otp: string;
};
