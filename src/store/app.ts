import { HDNodeWallet, JsonRpcProvider, Wallet } from "ethers";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IAppSettingsContractsApiResponse,
  IAppSettingsNetwork,
} from "../types/app-settings";
import { getWalletUsingMnemonic } from "../utils/web3";
import { getObject, saveCurrentUserInfo } from "@utils/indexDbManager";

export type AppStateType = {
  contracts: IAppSettingsContractsApiResponse | undefined;
  blockchain: IAppSettingsNetwork | undefined;
  wallet: Wallet | HDNodeWallet | undefined;
  currentUser: any | undefined;
};

type AppActionsType = {
  setContracts: (contracts: any) => Promise<void>;
  setBlockchain: (settings: any) => Promise<void>;
  saveCurrentUser: (user: any) => Promise<void>;
  saveWallet: (wallet: any) => Promise<void>;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>()(
  devtools((set) => ({
    contracts: undefined,
    blockchain: undefined,
    wallet: undefined,
    currentUser: undefined,
    setContracts: async (contracts) => {
      set({ contracts });
    },

    setBlockchain: async (value) => {
      const mnemoic =
        "scrap strong ship ring female minor gown toss popular muscle future cross";
      const blockchain = {
        chainId: value?.chainId,
        chainName: value?.chainName,
        chainWebSocket: value?.chainWebSocket,
        rpcUrl: value?.rpcUrl,
        blockExplorerUrls: value?.blockExplorerUrls,
        iconUrls: value?.iconUrls,
        networkId: value?.networkId,
        nativeCurrency: {
          name: value.nativeCurrency.name as string,
          symbol: value?.nativeCurrency?.symbol,
          decimals: 18,
        },
      };
      const wallet = getWalletUsingMnemonic(mnemoic).connect(
        new JsonRpcProvider(blockchain?.rpcUrl)
      );
      set({
        blockchain,
        wallet,
      });
    },

    saveCurrentUser: async (user: any) => {
      saveCurrentUserInfo(user);
      set({ currentUser: user });
    },

    saveWallet: async (wallet: any) => {
      if (!wallet) wallet = await getObject("wallet");
      set({ wallet });
    },
  }))
);

export default useAppStore;
