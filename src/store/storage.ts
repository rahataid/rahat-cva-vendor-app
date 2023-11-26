import { create } from "zustand";
import { Drivers, Storage } from "@ionic/storage";
import { devtools } from "zustand/middleware";
import { getCurrentUser, getWallet } from "@utils/sessionManager";

interface StorageState {
  wallet: any | null;
  currentUser: any | null;
  loading: boolean;

  setWallet: (wallet: string) => Promise<void>;
  setWalletState: (wallet: any) => Promise<void>;
  getCurrentWallet: () => Promise<void>;

  setCurrentUserState: (user: any) => Promise<void>;
  setCurrentUser: (user: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;

  storage: Storage | null;
  initializeStorage: () => Promise<void>;
  logout: () => void;
}

const useStorage = create<StorageState>()(
  devtools((set, get) => ({
    storage: null,
    wallet: null,
    currentUser: null,
    loading: true,

    initializeStorage: async () => {
      const store = new Storage({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        name: "RahatVendor",
        version: 1,
      });
      const storageInstance = await store.create();
      set({ storage: storageInstance });

      // const wallet = await storageInstance.get("wallet");
      const wallet = getWallet();
      set({ wallet, loading: false });

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
  }))
);

export default useStorage;
