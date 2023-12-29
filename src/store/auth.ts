import { saveCurrentUser, saveWalletInfo } from "@utils/sessionManager";
import {
  createRandomWalletWithPhone,
  getWalletUsingMnemonic,
} from "@utils/web3";
import { create } from "zustand";
import { DEFAULT_PASSCODE } from "../config";
import { IAddVendorPayload } from "../types/vendors";
import useAppStore from "./app";

type VendorStoreType = {
  handleRegister: any;
  handleRestore: any;
};

const saveWallet = useAppStore.getState().saveWallet;
const setCurrentUser = useAppStore.getState().saveCurrentUser;

const useAuthStore = create<VendorStoreType>((set) => ({
  handleRegister: async (data: IAddVendorPayload) => {
    if (!data?.phone || !data?.name) return;
    //  create random wallet with phone number
    const walletValue = createRandomWalletWithPhone(data?.phone);

    //  save vendor in backend db
    const vendorPayload = {
      ...data,
      walletAddress: walletValue?.address,
    };
    // const vendor = await VendorsService.add(vendorPayload);

    //  save wallet info in localstorage by encrypting with passcode in .env file
    const encryptedWallet = await walletValue.encrypt(DEFAULT_PASSCODE);
    saveWalletInfo(encryptedWallet);

    //  save currentUser info in localstorage and set currentUser state in appstore
    saveCurrentUser(vendorPayload);
    await setCurrentUser(vendorPayload);

    //  load wallet -> save wallet info state in appstore
    await saveWallet(walletValue);

    return walletValue;
  },

  handleRestore: async (mnemonics: string) => {
    if (!mnemonics) throw new Error("Mnemonics is empty");
    const wallet = getWalletUsingMnemonic(mnemonics);

    //  save wallet info in localstorage by encrypting with passcode in .env file
    const encryptedWallet = await wallet.encrypt(DEFAULT_PASSCODE);
    saveWalletInfo(encryptedWallet);
    await saveWallet(wallet);
  },
}));

export default useAuthStore;
