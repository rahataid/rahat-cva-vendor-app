export type VoucherDescription = {
  currency: string;
  description: string;
  id: string;
  price: string;
  __typename?: string;
};

export type ProjectVoucherDetails = {
  error: string;
  freeVoucherAddress: string;
  freeVoucherAssigned: string;
  freeVoucherBudget: string;
  freeVoucherClaimed: string;
  id: string;
  referredVoucherAddress: string;
  referredVoucherAssigned: string;
  referredVoucherBudget: string;
  referredVoucherClaimed: string;
  revertedFreeVoucher: string;
  revertedReferredVoucher: string;
  voucherDescriptiona: VoucherDescription[];
  __typename: string;
};
