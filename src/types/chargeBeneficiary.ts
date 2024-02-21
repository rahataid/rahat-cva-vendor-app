export type formDataType = {
  phoneWalletInput?: string | null;
  qrCode?: string | null;
  token: number | undefined;
};

export type checkObjType = {
  phone?: string;
  walletAddress?: string;
  token: number | undefined;
};

export enum FormInputType {
  phone = "phone",
  walletAddress = "walletAddress",
}
