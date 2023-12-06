import { create } from "zustand";
import { Drivers, Storage } from "@ionic/storage";
import { devtools } from "zustand/middleware";
import { getCurrentUser, getWallet } from "@utils/sessionManager";

interface StorageState {
  wallet: any | null;
  currentUser: any | null;
  loading: boolean;
  internetAccess: boolean;

  setWallet: (wallet: string) => Promise<void>;
  setWalletState: (wallet: any) => Promise<void>;
  getCurrentWallet: () => Promise<void>;

  setCurrentUserState: (user: any) => Promise<void>;
  setCurrentUser: (user: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;

  addTransaction: (data: object) => Promise<void>;
  getTransactionsList: () => Promise<[]> | Promise<void>;
  getTransaction: (id: string) => Promise<void>;

  storage: Storage | null;
  initializeStorage: () => Promise<void>;
  setInternetAccess: (value: boolean) => Promise<void>;
  logout: () => void;
}

const useStorage = create<StorageState>()(
  devtools((set, get) => ({
    storage: null,
    isInitialized: false,
    wallet: null,
    currentUser: null,
    loading: true,
    transactions: null,
    internetAccess: false,

    initializeStorage: async () => {
      const store = new Storage({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        name: "RahatVendor",
        version: 1,
      });
      const storageInstance = await store.create();
      set({ storage: storageInstance });
      await storageInstance.set("internetAccess", false);
      // const data = [
      //   {
      //     hash: "0x123456",
      //     createdAt: 1701852124,
      //     walletAddress: "0x1e5d0b89701670190c42478b1b12859cb941cf77",
      //     amount: 100,
      //     status: "NEW",
      //     isOffline: true,
      //   },
      //   {
      //     hash: "0x123457",
      //     createdAt: 1701852125,
      //     walletAddress: "0x1e5d0b89701670190c42478b1b12859cb941cf78",
      //     amount: 200,
      //     status: "PENDING",
      //     isOffline: true,
      //   },
      // ];
      // const { storage } = get();
      // if (storage) {
      //   await storage.set("transactions", data);
      // }

      // const wallet = await storageInstance.get("wallet");
      //// const wallet = getWallet();
      //// set({ wallet, loading: false });

      // const currentUser = await storageInstance.get("currentUser");
      // const currentUser = getCurrentUser();
      // set({ currentUser, loading: false });
    },

    setWallet: async (wallet: string) => {
      const { storage } = get();
      if (storage) {
        await storage.set("wallet", wallet);
      }
    },

    setWalletState: async (wallet: string) => {
      set({ wallet: wallet });
    },

    setCurrentUser: async (user: string) => {
      const { storage } = get();
      if (storage) {
        await storage.set("currentUser", user);
      }
    },

    setCurrentUserState: async (user: string) => {
      set({ currentUser: user });
    },

    getCurrentUser: async () => {
      const { storage } = get();
      let currentUser;
      if (storage) {
        currentUser = await storage.get("currentUser");
      }
      return currentUser;
    },

    getCurrentWallet: async () => {
      const { storage } = get();
      let currentWallet;
      if (storage) {
        currentWallet = await storage.get("wallet");
      }
      return currentWallet;
    },

    logout: async () => {
      const { storage } = get();
      set({ wallet: null, currentUser: null });
      await storage?.set("wallet", null);
      await storage?.set("currentUser", null);
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

    setInternetAccess: async (value) => {
      const { storage } = get();
      if (storage) await storage.set("internetAccess", value);
    },
  }))
);

export default useStorage;
