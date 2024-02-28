import {
  IProjectSettingsContractsApiResponse,
  IProjectSettingsNetwork,
} from "@types/project-settings";
import { IAddVendorPayload } from "@types/vendors";
import { axiosInstance } from "@utils/axios";
import { fixProjectUrl } from "@utils/helperFunctions";
import { createStore, localPersistStorage } from "@utils/storeUtils";
import {
  createRandomWalletWithPhone,
  getWalletUsingMnemonic,
} from "@utils/web3";
import { DEFAULT_PASSCODE } from "../config";
import { HDNodeWallet, Wallet } from "ethers";

type StorageChainData = {
  allowance: number;
  disbursed: number;
  distributed: number;
  isVendorApproved: boolean;
};

type StorageCurrentUser = {
  name: string;
  phone: string;
  address?: any;
  walletAddress: string;
};

type StorageProjectSettings = {
  baseUrl?: string;
  network?: IProjectSettingsNetwork;
  contracts?: IProjectSettingsContractsApiResponse;
  projectId?: string;
} | null;

export type AppStateType = {
  chainData: StorageChainData | undefined;
  wallet: Wallet | HDNodeWallet | undefined;
  currentUser: StorageCurrentUser | undefined;
  projectSettings: StorageProjectSettings | undefined;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

type AppActionsType = {
  initialize: () => Promise<void>;
  handleRegister: (
    data: IAddVendorPayload
  ) => Promise<Wallet | HDNodeWallet | any>;
  handleRestore: (data: string) => void;
  setChainData: (data: StorageChainData) => Promise<void>;
  setCurrentUser: (data: StorageCurrentUser) => void;
  setWallet: (data: any) => void;
  setProjectSettings: (data: StorageProjectSettings) => Promise<void>;
  logout: () => void;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = createStore<AppStoreType>(
  (set, get) => ({
    isAuthenticated: false,
    isInitialized: false,
    wallet: undefined,
    currentUser: undefined,
    projectSettings: undefined,
    chainData: undefined,

    initialize: async () => {
      const { currentUser, wallet, projectSettings } = get();

      if (projectSettings?.baseUrl)
        axiosInstance.defaults.baseURL = fixProjectUrl(projectSettings.baseUrl);

      set({
        isInitialized: true,
        isAuthenticated: !!currentUser && !!wallet,
      });
    },

    handleRegister: async (data: IAddVendorPayload) => {
      if (!data?.phone || !data?.name) return;
      //  create random wallet with phone number
      const walletValue = createRandomWalletWithPhone(data?.phone);

      //  save vendor in backend db
      const vendorPayload = {
        ...data,
        walletAddress: walletValue?.address,
      };

      //  save wallet info in localstorage by encrypting with passcode in .env file
      const encryptedWallet = await walletValue.encrypt(DEFAULT_PASSCODE);

      set({
        currentUser: vendorPayload,
        wallet: walletValue,
      });

      return walletValue;
    },

    handleRestore: async (mnemonics: string) => {
      if (!mnemonics) throw new Error("Mnemonics is empty");
      const wallet = getWalletUsingMnemonic(mnemonics);

      //  save wallet info in localstorage by encrypting with passcode in .env file
      const encryptedWallet = await wallet.encrypt(DEFAULT_PASSCODE);
      set({
        wallet,
      });
    },

    setChainData: async (chainData: StorageChainData) => {
      set({ chainData });
    },

    setWallet: async (wallet: any) => {
      set({ wallet });
    },

    setCurrentUser: async (currentUser: StorageCurrentUser) => {
      set({ currentUser });
    },

    setProjectSettings: async (data: StorageProjectSettings) => {
      set((state) => ({
        projectSettings: { ...state.projectSettings, ...data },
      }));
      if (data?.baseUrl)
        axiosInstance.defaults.baseURL = fixProjectUrl(data.baseUrl);
    },

    logout: async () => {
      set({
        isAuthenticated: false,
        isInitialized: true,
        wallet: undefined,
        currentUser: undefined,
        projectSettings: undefined,
        chainData: undefined,
      });
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "AppStore",
      storage: localPersistStorage,
      partialize: (state) => ({
        chainData: state.chainData,
        wallet: state.wallet,
        currentUser: state.currentUser,
        projectSettings: state.projectSettings,
      }),
    },
  }
);

export default useAppStore;
