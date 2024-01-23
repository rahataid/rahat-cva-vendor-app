import { Storage } from "@ionic/storage";
import { ITransactionItem, Status } from "@types/transactions";
import {
  createStore,
  ionicIdbStorage,
  localPersistStorage,
} from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore, { AppStoreType } from "./app";
import { getWalletUsingMnemonic, signMessage } from "@utils/web3";
import VendorsService from "@services/vendors";
import { setTransactionStatus } from "@utils/helperFunctions";

export type TransactionStoreType = TransactionStateType &
  TransactionActionsType;

export type TransactionStateType = {
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
  triggerUpdateState: boolean;
};

type TransactionActionsType = {
  referredAppStoreState: () => AppStoreType;
  addTransaction: (data: ITransactionItem) => Promise<void>;
  setTransactions: (data: ITransactionItem[]) => Promise<void>;
  triggerUpdate: () => void;
  setVendorTransactions: (data: ITransactionItem[]) => Promise<void>;
  getVendorTransactions: () => Promise<[] | ITransactionItem[]>;
  getPendingOfflineTransactions: () => Promise<[] | ITransactionItem[]>;
  syncTransactions: () => Promise<void>;
  logoutTransactions: () => void;
};

const useTransactionStore = createStore<TransactionStoreType>(
  (set, get) => ({
    transactions: [],
    vendorTransactions: [],
    triggerUpdateState: false,
    referredAppStoreState: () => useAppStore.getState(),

    setTransactions: async (data: ITransactionItem[]) => {
      set({ transactions: data });
    },

    setVendorTransactions: async (data: ITransactionItem[]) => {
      set({ vendorTransactions: data });
    },

    triggerUpdate: () => {
      set({ triggerUpdateState: !get().triggerUpdateState });
    },

    addTransaction: async (data: ITransactionItem) => {
      const { transactions, getVendorTransactions } = get();
      // const vendorTransactions = await getVendorTransactions(wallet?.address);
      set({ transactions: [...transactions, data] });
    },

    getVendorTransactions: async () => {
      const { transactions, referredAppStoreState } = get();
      const { wallet } = referredAppStoreState();
      if (!transactions?.length) return [];
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.vendorWalletAddress === wallet?.address
      );
      return filteredTransactions;
    },

    getPendingOfflineTransactions: async () => {
      // only get vendor's offline transactions with status = NEW || FAIL
      const { transactions, referredAppStoreState } = get();
      const { wallet } = referredAppStoreState();

      if (!transactions?.length) return [];

      const cond1 = (item: any) => item.isOffline;
      const cond2 = (item: any) =>
        item.status === "NEW" || item.status === "FAIL";
      const cond3 = (item: any) => item.vendorWalletAddress === wallet?.address;

      const offlineTransactions = transactions.filter(
        (el) => cond1(el) && cond2(el) && cond3(el)
      );

      return offlineTransactions;
    },

    syncTransactions: async () => {
      try {
        const { transactions, setTransactions, referredAppStoreState } = get();
        const { wallet } = referredAppStoreState();
        const walletValue = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

        const offlineTransactions = await get().getPendingOfflineTransactions();
        if (!offlineTransactions?.length)
          throw new Error("No pending transactions to sync");

        const signedMessage = await signMessage({
          wallet: walletValue,
          message: offlineTransactions,
        });

        const payload = {
          message: offlineTransactions,
          signedMessage,
        };

        try {
          const res = await VendorsService.syncTransactions(payload);
          const updatedTransactions = setTransactionStatus(
            transactions,
            offlineTransactions,
            Status.SUCCESS,
            res?.data
          );
          setTransactions(updatedTransactions);
        } catch (error) {
          const updatedTransactions = setTransactionStatus(
            transactions,
            offlineTransactions,
            Status.FAIL
          );
          setTransactions(updatedTransactions);
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    },

    logoutTransactions: () => {
      set({ vendorTransactions: [] });
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "TransactionsStore",
      storage: createJSONStorage(() => ionicIdbStorage("TransactionsStore")),
      partialize: (state) => ({
        transactions: state.transactions,
      }),
      // onRehydrateStorage: (state) => {
      //   console.log("REHYDRATED", state);
      // },
    },
  }
);

export default useTransactionStore;
