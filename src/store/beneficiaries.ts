import { Storage } from "@ionic/storage";
import { IBeneficiary } from "@types/beneficiaries";
import { ITransactionItem, Status } from "@types/transactions";
import {
  createStore,
  ionicIdbStorage,
  localPersistStorage,
} from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore from "./app";
import useTransactionsStore from "./transactions";
import ProjectsService from "@services/projects";
import VendorsService from "@services/vendors";
import { setTransactionStatus } from "@utils/helperFunctions";
import { getWalletUsingMnemonic, signMessage } from "@utils/web3";

export type AppStoreType = AppStateType & AppActionsType;

export type AppStateType = {
  beneficiaries: IBeneficiary[] | [];
};

type AppActionsType = {
  initializeBeneficiaries: () => Promise<void>;
  setBeneficiaries: (data: IBeneficiary[]) => Promise<void>;
  syncBeneficiaries: () => Promise<void>;
  chargeBeneficiary: (data: ITransactionItem) => Promise<void>;
};

const { wallet: stateWallet, projectSettings } = useAppStore.getState();
const { getPendingOfflineTransactions, setTransactions, transactions } =
  useTransactionsStore.getState();

const useBeneficiaryStore = createStore<AppStoreType>(
  (set, get) => ({
    beneficiaries: [],

    initializeBeneficiaries: async () => {},

    setBeneficiaries: async (beneficiaries: IBeneficiary[]) => {
      set({ beneficiaries });
    },

    syncBeneficiaries: async () => {
      const { setBeneficiaries } = get();
      const pendingOfflineTransactions = await getPendingOfflineTransactions();
      if (pendingOfflineTransactions?.length)
        throw new Error(
          "Please sync pending offline transactions first to sync beneficiaries again"
        );

      const data = await ProjectsService.getProjectOfflineBeneficaries(
        projectSettings?.contracts?.CVAProject?.address
      );
      await setBeneficiaries(data?.data);
    },

    chargeBeneficiary: async (data: ITransactionItem) => {
      const wallet = getWalletUsingMnemonic(stateWallet?.mnemonic?.phrase);
      const signedMessage = await signMessage({ wallet, message: data });
      const payload = {
        message: data,
        signedMessage,
      };
      try {
        await VendorsService.chargeBeneficiary(payload);
        const updatedTransactions = setTransactionStatus(
          transactions,
          [data],
          Status.SUCCESS
        );
        setTransactions(updatedTransactions);
      } catch (error) {
        const updatedTransactions = setTransactionStatus(
          transactions,
          [data],
          Status.FAIL
        );
        setTransactions(updatedTransactions);
        throw error;
      }
    },
  }),
  {
    persistOptions: {
      name: "BeneficiariesStore",
      storage: localPersistStorage,
      partialize: (state) => ({
        beneficiaries: state.beneficiaries,
      }),
      onRehydrateStorage: (state) => {
        console.log("REHYDRATED", state);
      },
    },

    devtoolsEnabled: true,
  }
);

export default useBeneficiaryStore;
