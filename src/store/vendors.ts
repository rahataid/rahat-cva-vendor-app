import { create } from "zustand";
import { IVendorChainData } from "../types/useProject";
import { VendorStoreType } from "@types/store/vendor";

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
