import { saveCurrentUser, saveWalletInfo } from "@utils/sessionManager";
import { createRandomWalletWithPhone } from "@utils/web3";
import { create } from "zustand";
import { DEFAULT_PASSCODE } from "../config";
import { addVendorPayload } from "../types/vendors";
import useAppStore from "./app";
console.log("DEFAULT PASS", DEFAULT_PASSCODE);

type VendorStoreType = {
  handleRegister: any;
};

const setWallet = useAppStore.getState().saveWallet;
const setCurrentUser = useAppStore.getState().saveCurrentUser;

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
    // const vendor = await VendorsService.add(vendorPayload);
    // console.log("VENDOR REGISTER", vendor);

    //  save wallet info in localstorage by encrypting with passcode in .env file
    const encryptedWallet = await walletValue.encrypt(DEFAULT_PASSCODE);
    console.log("ENCRYPTED WALLET", encryptedWallet);
    saveWalletInfo(encryptedWallet);

    //  save currentUser info in localstorage and set currentUser state in appstore
    saveCurrentUser(vendorPayload);
    await setCurrentUser(vendorPayload);

    //  load wallet -> save wallet info state in appstore
    await setWallet(walletValue);

    return walletValue;
  },
}));

export default useAuthStore;
