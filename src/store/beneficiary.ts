import { Storage } from "@ionic/storage";
import { IBeneficiary } from "@types/beneficiaries";
import { ITransactionItem, Status } from "@types/transactions";
import {
  createStore,
  ionicIdbStorage,
  localPersistStorage,
} from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore, { AppStoreType } from "./app";
import useTransactionStore, { TransactionStoreType } from "./transaction";
import ProjectsService from "@services/projects";
import VendorsService from "@services/vendors";
import { setTransactionStatus } from "@utils/helperFunctions";
import { getWalletUsingMnemonic, signMessage } from "@utils/web3";

export type BeneficiaryStoreType = BeneficiaryStateType &
  BeneficiaryActionsType;

export type BeneficiaryStateType = {
  beneficiaries: IBeneficiary[] | [];
};

type BeneficiaryActionsType = {
  referredAppStoreState: () => AppStoreType;
  referredTransactionStoreState: () => TransactionStoreType;
  setBeneficiaries: (data: IBeneficiary[]) => Promise<void>;
  syncBeneficiaries: () => Promise<void>;
  chargeBeneficiary: (data: ITransactionItem) => Promise<void>;
  logoutBeneficiaries: () => void;
};

const useBeneficiaryStore = createStore<BeneficiaryStoreType>(
  (set, get) => ({
    beneficiaries: [],
    referredAppStoreState: () => useAppStore.getState(),
    referredTransactionStoreState: () => useTransactionStore.getState(),

    setBeneficiaries: async (beneficiaries: IBeneficiary[]) => {
      set({ beneficiaries });
    },

    syncBeneficiaries: async () => {
      const {
        setBeneficiaries,
        referredAppStoreState,
        referredTransactionStoreState,
      } = get();
      const { projectSettings } = referredAppStoreState();
      const { getPendingOfflineTransactions } = referredTransactionStoreState();
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
      const { referredAppStoreState, referredTransactionStoreState } = get();
      const { wallet: stateWallet } = referredAppStoreState();
      const { transactions, setTransactions } = referredTransactionStoreState();
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

    logoutBeneficiaries: () => {
      set({ beneficiaries: [] });
    },
  }),
  {
    persistOptions: {
      name: "BeneficiariesStore",
      storage: createJSONStorage(() => ionicIdbStorage("BeneficiariesStore")),
      partialize: (state) => ({
        beneficiaries: state.beneficiaries,
      }),
    },

    devtoolsEnabled: true,
  }
);

export default useBeneficiaryStore;
