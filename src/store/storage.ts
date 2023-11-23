import { create } from "zustand";
import { Drivers, Storage } from "@ionic/storage";
import { devtools } from "zustand/middleware";

interface StorageState {
  storage: Storage | null;
  wallet: string | null;
  currentUser: string | null;
  loading: boolean;

  initializeStorage: () => Promise<void>;
  setWallet: (wallet: string) => Promise<void>;
  setWalletState: (wallet: any) => Promise<void>;
  setCurrentUser: (user: string) => Promise<void>;
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

      const wallet = await storageInstance.get("wallet");
      set({ wallet, loading: false });
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
        set({ currentUser: user });
      }
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
