import { Drivers, Storage } from "@ionic/storage";
import { getKey } from "@utils/sessionManager";
import { HDNodeWallet, Wallet } from "ethers";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  IProjectSettingsContractsApiResponse,
  IProjectSettingsNetwork,
} from "../types/project-settings";
import { axiosInstance } from "@utils/axios";
import taskProcess from "@utils/taskProcess";

type StorageProjectSettings = {
  baseUrl: string;
  network: IProjectSettingsNetwork;
  contracts: IProjectSettingsContractsApiResponse;
  projectId: string;
  internetAccess: boolean;
} | null;

type StorageOfflineTasks = {
  payload: any;
  callFn: any;
  params: any[];
} | null;

export type AppStateType = {
  chainData: any;
  isAuthenticated: boolean;
  isInitialized: boolean;
  wallet: Wallet | HDNodeWallet | undefined;
  currentUser: any | undefined;
  claimId: string | undefined;
  beneficiary: string | undefined;
  storage: Storage | null;
  txStorage: Storage | null;
  contractsFn: any;
  projectSettings: StorageProjectSettings | null;
  offlineTasks: any;
  transactions: any[];
  beneficiaries: any[];
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
  setProjectSettings: (value: StorageProjectSettings) => Promise<void>;
  getProjectSettings: () => Promise<void>;
  setWallet: (wallet: any) => void;
  setTasks: (key: string, value: StorageOfflineTasks) => Promise<void>;
  setChainData: (data: any) => void;
  syncTransactions: () => void;
  setBeneficiariesList: (data: any) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>()(
  devtools((set, get) => ({
    chainData: {
      allowance: 0,
      balance: 0,
      distributed: 0,
      isVendorApproved: false,
    },
    offlineTasks: null,
    storage: null,
    txStorage: null,
    isInitialized: false,
    isAuthenticated: false,
    claimId: undefined,
    beneficiary: undefined,
    projectSettings: null,
    wallet: undefined,
    currentUser: undefined,
    contractsFn: undefined,
    projectId: undefined,
    transactions: [],
    beneficiaries: [],

    initialize: async () => {
      console.log("INITIALIZE CALLED");
      const store = new Storage({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        name: "RahatVendor",
        version: 1,
      });
      const txStore = new Storage({
        driverOrder: [Drivers.LocalStorage],
        name: "RahatVendorTransactions",
        version: 1,
      });
      const storageInstance = await store.create();
      const txStorageInstance = await txStore.create();
      set({ storage: storageInstance });
      set({ txStorage: txStorageInstance });

      try {
        const currentUser = await storageInstance?.get("currentUser");
        const projectSettings = await storageInstance?.get("projectSettings");
        const wallet = await storageInstance?.get("wallet");
        const beneficiaries = await storageInstance?.get("beneficiaries");
        const chainData = await txStorageInstance?.get("chainData");
        const transactions = await txStorageInstance?.get("transactions");

        if (wallet) {
          set({
            wallet,
          });
        }

        if (beneficiaries) {
          set({ beneficiaries });
        }

        if (currentUser) {
          set({ currentUser });
        }

        if (projectSettings) {
          set({ projectSettings });
          if (projectSettings?.baseUrl) {
            axiosInstance.defaults.baseURL = projectSettings.baseUrl;
          }
        }

        if (chainData) {
          set({ chainData });
        }

        if (transactions) {
          set({ transactions });
        }
        set({
          isInitialized: true,
          isAuthenticated: !!currentUser && !!wallet,
        });
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

    setProjectSettings: async (value: StorageProjectSettings) => {
      const { storage } = get();
      const data = await storage?.get("projectSettings");
      if (storage) await storage.set("projectSettings", { ...data, ...value });
    },

    getProjectSettings: async () => {
      return get()?.storage?.get("projectSettings");
    },

    addTransaction: async (data) => {
      const { txStorage } = get();
      if (txStorage) {
        let currentTransactions = await txStorage?.get("transactions");
        let payload;
        if (currentTransactions?.length) {
          payload = [...currentTransactions, data];
          await txStorage?.set("transactions", payload);
        } else {
          payload = [data];
          await txStorage?.set("transactions", payload);
        }
        set({ transactions: payload });
      }
    },

    getTransactionsList: async () => {
      const { txStorage } = get();
      let transactions;
      if (txStorage) {
        transactions = await txStorage.get("transactions");
      }
      set({ transactions });
    },

    getTransaction: async (id) => {
      const { txStorage } = get();
      let transaction;
      if (txStorage) {
        const transactions = await txStorage.get("transactions");
        transaction = transactions.filter((el: any) => el.id === id);
      }
      return transaction;
    },

    setChainData: (data) => {
      set({ chainData: data });
      get().txStorage?.set("chainData", data);
    },

    setTasks: async (key: string, value: StorageOfflineTasks) => {
      console.log("key,value", key, value);
      const { storage, projectSettings } = get();

      if (projectSettings?.internetAccess) {
        if (value?.callFn && value?.params) {
          const res = await value?.callFn(...value?.params);
          return res;
        } else {
          console.log("Function or parameters are not defined");
          throw new Error("Function or parameters are not defined");
        }
      }
      if (!projectSettings?.internetAccess && storage) {
        let currentTasks = await storage?.get("offlineTasks");
        if (currentTasks) {
          const payload = {
            ...currentTasks,
            [key]: [
              {
                ...value,
                callFn: value?.callFn.toString(), // Serialize the function to a string
              },
            ],
          };
          return storage?.set("offlineTasks", payload);
        } else {
          const payload = {
            [key]: [
              {
                ...value,
                callFn: value?.callFn.toString(), // Serialize the function to a string
              },
            ],
          };
          return storage?.set("offlineTasks", payload);
        }
      }
    },

    setInternetAccess: async (value) => {
      set((state) => {
        return {
          projectSettings: { ...state.projectSettings, internetAccess: value },
        };
      });
      const currentProjectSettings = await get().storage?.get(
        "projectSettings"
      );
      get().storage?.set("projectSettings", {
        ...currentProjectSettings,
        internetAccess: value,
      });

      // if (value === true) {
      //   const { storage } = get();
      //   if (storage) {
      //     const tasks = await storage.get("offlineTasks");
      //     if (tasks) {
      //       for (const [key, value] of Object.entries(tasks)) {
      //         for (const task of value) {
      //           const { callFn, params } = task;
      //           const fn = new Function(`return ${callFn}`)();
      //           fn(...params);
      //         }
      //       }
      //     }
      //   }
      // }
    },

    async syncTransactions() {
      const transactions = get().transactions;
      const wallet = get().wallet;
      const offlineTransactions = transactions.filter((t) => t.isOffline);
      // offlineTransactions.forEach(({ phone, ...data }) => {
      //   const sendData = {
      //     amount: data.amount,
      //   };
      //   return taskProcess.chargeBeneficiaryPhone.callFn(phone, sendData);
      // });

      // for (const el of offlineTransactions) {
      //   const { phone, amount } = el;
      //   const payload = {
      //     amount,
      //     phone,
      //   };
      //   const res = await taskProcess.chargeBeneficiaryPhone.callFn(
      //     wallet?.address,
      //     payload
      //   );
      //   console.log(res);
      // }
    },

    async setBeneficiariesList(data) {
      console.log("SET BENEFICIARIES", data);
      set({ beneficiaries: data });
      await get().storage?.set("beneficiaries", { beneficiaries: data });
    },
  }))
);

export default useAppStore;
