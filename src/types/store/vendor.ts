import { IVendorChainData } from "@types/useProject";

export type VendorStateType = {
  chainData: IVendorChainData;
};

export type VendorActionsType = {
  setChainData: (chainData: IVendorChainData) => void;
};

export type VendorStoreType = VendorStateType & VendorActionsType;
