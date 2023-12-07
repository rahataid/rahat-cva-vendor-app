import { Drivers, Storage } from "@ionic/storage";
import { getKey } from "@utils/sessionManager";
import { HDNodeWallet, Wallet } from "ethers";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IAppSettingsContractsApiResponse,
  IAppSettingsNetwork,
} from "../types/app-settings";

type StorageAppSettings = {
  baseUrl: string;
  network: IAppSettingsNetwork;
  contracts: IAppSettingsContractsApiResponse;
  projectId: string;
} | null;

export type AppStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  wallet: Wallet | HDNodeWallet | undefined;
  currentUser: any | undefined;
  claimId: string | undefined;
  beneficiary: string | undefined;
  internetAccess: boolean;
  storage: Storage | null;
  contractsFn: any;
  appSettings: StorageAppSettings | null;
};

type AppActionsType = {
  initialize: () => Promise<void>;
  saveCurrentUser: (user: any) => Promise<void>;
  saveWallet: (wallet: any) => void;
  toggleIsAuthenticated: () => void;
  setClaimId: (beneficiary: string, claimId: string) => void;
  setInternetAccess: (value: boolean) => void;
  addTransaction: (data: object) => Promise<void>;
  getTransactionsList: () => Promise<[]> | Promise<void>;
  getTransaction: (id: string) => Promise<void>;
  setAppSettings: (value: StorageAppSettings) => Promise<void>;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>()(
  devtools((set, get) => ({
    storage: null,
    isInitialized: false,
    isAuthenticated: false,
    claimId: undefined,
    beneficiary: undefined,
    internetAccess: false,
    appSettings: null,
    wallet: undefined,
    currentUser: undefined,
    contractsFn: undefined,
    projectId: undefined,

    initialize: async () => {
      const store = new Storage({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        name: "RahatVendor",
        version: 1,
      });
      const storageInstance = await store.create();
      set({ storage: storageInstance });
      await storageInstance.set("internetAccess", true);

      try {
        const currentUser = await storageInstance?.get("currentUser");
        const internetAccess = await storageInstance?.get("internetAccess");
        const appSettings = await storageInstance?.get("appSettings");
        const wallet = await storageInstance?.get("wallet");

        if (wallet) {
          set({ wallet, isAuthenticated: true, isInitialized: true });
        }

        if (currentUser) {
          set({ currentUser });
        }

        if (internetAccess) {
          set({ internetAccess });
        }

        if (appSettings) {
          set({ appSettings });
        }

        set({ isInitialized: true });
      } catch (error) {
        console.log("APP STORE INITIALIZE ERROR", error);
      }
    },

    saveCurrentUser: async (user: any) => {
      set({ currentUser: user });
      const { storage } = get();
      if (storage) {
        await storage.set("currentUser", user);
      }
    },

    saveWallet: (wallet: any) => {
      if (!wallet) wallet = getKey("wallet");
      set({ wallet });
      get().storage?.set("wallet", wallet);
    },

    toggleIsAuthenticated: () => {
      const { isAuthenticated } = get();
      set({ isAuthenticated: !isAuthenticated });
    },

    setClaimId: (beneficiary, claimId) => {
      set({ beneficiary, claimId });
      get().storage?.set("beneficiary", beneficiary);
    },

    setWallet: (wallet: any) => {
      set({ wallet });
      get().storage?.set("wallet", wallet);
    },

    setInternetAccess: (value) => {
      set({ internetAccess: value });
      get().storage?.set("internetAccess", value);
    },

    setAppSettings: async (value: StorageAppSettings) => {
      const { storage } = get();
      const data = await storage?.get("appSettings");
      if (storage) await storage.set("appSettings", { ...data, ...value });
    },

    addTransaction: async (data) => {
      console.log("ADD TRANSACTION");
      const { storage } = get();
      if (storage) {
        let currentTransactions = await storage?.get("transactions");
        if (currentTransactions?.length) {
          const payload = [...currentTransactions, data];
          console.log("PAYLOAD", payload);
          await storage?.set("transactions", payload);
        } else {
          const payload = [data];
          console.log("PAYLOAD", payload);
          await storage?.set("transactions", payload);
        }
      }
    },

    getTransactionsList: async () => {
      const { storage } = get();
      let transactions;
      if (storage) {
        transactions = await storage.get("transactions");
      }
      return transactions;
    },

    getTransaction: async (id) => {
      const { storage } = get();
      let transaction;
      if (storage) {
        const transactions = await storage.get("transactions");
        transaction = transactions.filter((el: any) => el.id === id);
      }
      return transaction;
    },
  }))
);

export default useAppStore;
