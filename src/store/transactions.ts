import { Storage } from "@ionic/storage";
import { ITransactionItem, Status } from "@types/transactions";
import {
  createStore,
  ionicIdbStorage,
  localPersistStorage,
} from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore from "./app";
import { getWalletUsingMnemonic, signMessage } from "@utils/web3";
import VendorsService from "@services/vendors";
import { setTransactionStatus } from "@utils/helperFunctions";

export type AppStoreType = AppStateType & AppActionsType;

export type AppStateType = {
  wallet: any;
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
};

type AppActionsType = {
  setWallet: (data: any) => void;
  initializeTransactions: () => Promise<void>;
  addTransaction: (data: ITransactionItem) => Promise<void>;
  setTransactions: (data: ITransactionItem[]) => Promise<void>;
  getVendorTransactionsList: (data: string) => Promise<[] | ITransactionItem[]>;
  getPendingOfflineTransactions: () => Promise<[] | ITransactionItem[]>;
  syncTransactions: () => Promise<void>;
};

const { wallet } = useAppStore.getState();

const useTransactionsStore = createStore<AppStoreType>(
  (set, get) => ({
    wallet: undefined,
    transactions: [],
    vendorTransactions: [],

    setWallet: (wallet: any) => {
      set({ wallet });
    },

    initializeTransactions: async () => {
      console.log("TRANSACTION INITIALIZE");
      const { getVendorTransactionsList } = get();

      const vendorTransactions = await getVendorTransactionsList(
        wallet?.address
      );
      console.log(
        "TRANSACTION INITIALIZE",
        wallet?.address,
        vendorTransactions
      );
      set({
        vendorTransactions,
      });
    },

    setTransactions: async (data: ITransactionItem[]) => {
      set({ transactions: data });
    },

    addTransaction: async (data: ITransactionItem) => {
      const { transactions, getVendorTransactionsList } = get();
      const vendorTransactions = await getVendorTransactionsList(
        wallet?.address
      );
      set({ transactions: [...transactions, data], vendorTransactions });
    },

    getVendorTransactionsList: async (vendorWalletAddress: string) => {
      const { transactions } = get();
      if (!transactions?.length) return [];
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.vendorWalletAddress === vendorWalletAddress
      );
      return filteredTransactions;
    },

    getPendingOfflineTransactions: async () => {
      // only get vendor's offline transactions with status = NEW || FAIL
      const { transactions } = get();

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
        const { transactions, setTransactions } = get();
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
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "TransactionsStore",
      storage: localPersistStorage,
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    },
  }
);

export default useTransactionsStore;
