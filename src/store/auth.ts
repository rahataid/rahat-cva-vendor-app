import { create } from "zustand";
import { IVendorChainData } from "../types/useProject";
import { createRandomWallet, createRandomWalletWithPhone } from "@utils/web3";
import VendorsService from "@services/vendors";
import { addVendorPayload } from "../types/vendors";
import { Preferences } from "@capacitor/preferences";
import { DEFAULT_PASSCODE } from "../config";
import { saveWalletInfo } from "@utils/sessionManager";
import useAppStore from "@store/app";
console.log("DEFAULT PASS", DEFAULT_PASSCODE);

type VendorStoreType = {
  handleRegister: any;
};

const saveCurrentUser = useAppStore.getState().saveCurrentUser;
const saveWallet = useAppStore.getState().saveWallet;

const useAuthStore = create<VendorStoreType>((set) => ({
  handleRegister: async (data: addVendorPayload) => {
    if (!data?.phone || !data?.name) return;
    //  create random wallet with phone number
    const walletValue = createRandomWalletWithPhone(data?.phone);
    console.log("RANDOM WALLET VALUE", walletValue);

    //  save vendor in backend db
    const vendorPayload = {
      ...data,
      walletAddress: walletValue?.address,
    };
    const vendor = await VendorsService.add(vendorPayload);
    console.log("VENDOR REGISTER", vendor);

    //  save wallet info in localstorage by encrypting with passcode in .env file
    const encryptedWallet = await walletValue.encrypt(DEFAULT_PASSCODE);
    console.log("ENCRYPTED WALLET", encryptedWallet);
    await saveWalletInfo(encryptedWallet);

    //  save currentUser info in localstorage and set currentUser state in appstore
    await saveCurrentUser(vendor.data);

    //  load wallet -> save wallet info state in appstore
    await saveWallet(walletValue);

    return walletValue;
  },
}));

export default useAuthStore;
