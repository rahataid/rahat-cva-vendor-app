import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IAppSettingsContractsApiResponse,
  IAppSettingsNetwork,
} from "../types/app-settings";
import { getWalletUsingMnemonic } from "../utils/web3";
import { getKey, getWallet } from "@utils/sessionManager";
import { Contract, HDNodeWallet, JsonRpcProvider, Wallet } from "ethers";
import AppSettingService from "@services/app-settings";

export type AppStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  chainUrl: string | undefined;
  chainId: string | undefined;
  chainWebSocket: string | undefined;
  contracts: IAppSettingsContractsApiResponse | undefined;
  blockchain: IAppSettingsNetwork | undefined;
  wallet: Wallet | HDNodeWallet | undefined;
  currentUser: any | undefined;
  claimId: string | undefined;
  beneficiary: string | undefined;
  internetAccess: boolean;
};

type AppActionsType = {
  initialize: () => Promise<void>;
  setContracts: (contracts: any) => Promise<void>;
  setBlockchain: (settings: any) => Promise<void>;
  saveCurrentUser: (user: any) => Promise<void>;
  saveWallet: (wallet: any) => void;
  getAppSettings: () => Promise<any>;
  contractsFn: any;
  toggleIsAuthenticated: () => void;
  setClaimId: (beneficiary: string, claimId: string) => void;
  setInternetAccess: (value: boolean) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>()(
  devtools((set, get) => ({
    isInitialized: false,
    isAuthenticated: false,
    chainUrl: undefined,
    chainId: undefined,
    chainWebSocket: undefined,
    claimId: undefined,
    beneficiary: undefined,
    internetAccess: false,

    contracts: undefined,
    blockchain: undefined,
    wallet: undefined,
    currentUser: undefined,
    contractsFn: undefined,

    initialize: async () => {
      try {
        console.log("initialize called");
        const { getAppSettings } = get();
        let wallet = await getWallet();
        console.log("wallet in localstorage", wallet);

        if (wallet) {
          set({
            isAuthenticated: true,
            isInitialized: true,
            wallet,
          });
        } else {
          set({
            isAuthenticated: false,
            isInitialized: true,
            wallet: undefined,
          });
        }
      } catch (error) {
        console.log("APP STORE INITIALIZE ERROR", error);
      }
    },

    getAppSettings: async () => {
      try {
        const contractAddress = await AppSettingService.getSettings(
          "CONTRACT_ADDRESS"
        );
        const blockchain = await AppSettingService.getSettings("BLOCKCHAIN");

        const contractAddresses = Object.entries(
          contractAddress.data.rows[0].value
        ).reduce((acc, [r, i]) => {
          acc[r] = i.address;
          return acc;
        }, {});

        const blockchainSettings = blockchain?.data?.rows[0]?.value;
        const contractDetails = Object.entries(
          contractAddress.data.rows[0].value
        ).map(([acc, d], i) => ({ name: acc, address: d.address, abi: d.abi }));

        return {
          contractDetails,
          contractAddresses,
          blockchainSettings,
        };
      } catch (err) {
        console.error("Unable to Load App Setting from Server", err);
      }
    },

    saveCurrentUser: async (user: any) => {
      set({ currentUser: user });
    },

    saveWallet: (wallet: any) => {
      if (!wallet) wallet = getKey("wallet");
      set({ wallet });
    },

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

    toggleIsAuthenticated: () => {
      const { isAuthenticated } = get();
      set({ isAuthenticated: !isAuthenticated });
    },

    setClaimId: (beneficiary, claimId) => {
      set({ beneficiary, claimId });
    },

    setInternetAccess: (value) => {
      set({ internetAccess: value });
    },
  }))
);

export default useAppStore;
