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

export enum VoucherTypeBackend {
  FREEVOUCHER = "FREEVOUCHER",
  DISCOUNTVOUCHER = "DISCOUNTVOUCHER",
}

export enum RedemptionStatus {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
}
export type VendorVoucherRedemptionDetails = {
  id?: number;
  uuid?: string;
  vendorId?: string;
  voucherNumber?: number;
  voucherType?: VoucherTypeBackend;
  status?: RedemptionStatus;
  adminAddress?: string;
  Vendor?: {
    id?: number;
    uuid?: string;
    walletAddress?: string;
    extras?: any;
    beneficiaryId?: any;
  };
};
