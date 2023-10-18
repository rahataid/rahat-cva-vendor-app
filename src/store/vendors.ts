import { create } from "zustand";
import { IVendorChainData } from "../types/useProject";

export type VendorStateType = {
  chainData: IVendorChainData;
};

type VendorActionsType = {
  setChainData: (chainData: IVendorChainData) => void;
};

export type VendorStoreType = VendorStateType & VendorActionsType;

const useVendorStore = create<VendorStoreType>((set) => ({
  chainData: {
    isVendor: null,
    allowance: 0,
    balance: 0,
    disbursed: 0,
  },
  setChainData: (chainData: IVendorChainData) => {
    set({ chainData });
  },
}));

export default useVendorStore;
