import { ITransactionItem } from "@types/transactions";
import {
  createStore,
  ionicIdbStorage,
  localPersistStorage,
} from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore, { AppStoreType } from "./app";
import {
  createContractInstance,
  getMetaTxRequest,
  getWalletUsingMnemonic,
  signMessage,
} from "@utils/web3";
import VendorsService from "@services/vendors";
import { BENEFICIARY_ADDRESS, RPC_URL } from "../config";
import { BENEFICIARY_VOUCHER_DETAILS, VOUCHER } from "@types/beneficiaries";

export type TransactionStoreType = TransactionStateType &
  TransactionActionsType;

export type TransactionStateType = {
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
  triggerUpdateState: boolean;
};

type TransactionActionsType = {
  referredAppStoreState: () => AppStoreType;
  triggerUpdate: () => void;
  redeemVoucher: (
    voucherType: VOUCHER,
    voucher?: BENEFICIARY_VOUCHER_DETAILS
  ) => Promise<any>;
  verifyOtp: (otp: string, beneficiaryAddress: string) => Promise<any>;
  updateStatus: (
    voucherType: VOUCHER,
    beneficiaryAddress: string,
    referralVoucherAddress?: string
  ) => Promise<any>;
  logoutTransactions: () => void;
};

const useTransactionStore = createStore<TransactionStoreType>(
  (set, get) => ({
    transactions: [],
    vendorTransactions: [],
    triggerUpdateState: false,
    referredAppStoreState: () => useAppStore.getState(),

    triggerUpdate: () => {
      set({ triggerUpdateState: !get().triggerUpdateState });
    },

    redeemVoucher: async (voucherType, voucher) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELProject, ERC2771Forwarder },
          network,
        },
      } = referredAppStoreState();

      // const ElProjectInstance = await createContractInstance(
      //   RPC_URL,
      //   ELProject
      // );

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, ELProject);

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELProject
      );

      const ForwarderContractInstance = await createContractInstance(
        RPC_URL,
        ERC2771Forwarder
      );

      // let res;
      let metaTxRequest;
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        // res = await ElProjectInstance.requestTokenFromBeneficiary(
        //   BENEFICIARY_ADDRESS
        // );
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "requestTokenFromBeneficiary(address)",
          [BENEFICIARY_ADDRESS]
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        // res = await ElProjectInstance.requestReferredTokenFromBeneficiary(
        //   BENEFICIARY_ADDRESS,
        //   voucher.ReferredVoucherAddress
        // );
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "requestReferredTokenFromBeneficiary",
          [BENEFICIARY_ADDRESS, voucher?.ReferredVoucherAddress]
        );
      }
      const payload = {
        ...metaTxRequest,
        gas: metaTxRequest.gas.toString(),
        nonce: metaTxRequest.nonce.toString(),
        value: metaTxRequest.value.toString(),
      };
      await VendorsService.executeMetaTxRequest({
        metaTxRequest: payload,
      });

      // return res;
    },

    verifyOtp: async (otp, beneficiaryAddress) => {
      //processTokenRequest
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELProject, ERC2771Forwarder },
        },
      } = referredAppStoreState();

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, ELProject);
      // const res = await ElProjectInstance.procesTokenRequest(
      //   beneficiaryAddress,
      //   otp
      // );
      // console.log("RES", res);
      // return res;
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELProject
      );

      const ForwarderContractInstance = await createContractInstance(
        RPC_URL,
        ERC2771Forwarder
      );

      const metaTxRequest = await getMetaTxRequest(
        walletInstance,
        ForwarderContractInstance,
        ElProjectInstance,
        "processTokenRequest",
        [beneficiaryAddress, otp]
      );
      const payload = {
        ...metaTxRequest,
        gas: metaTxRequest.gas.toString(),
        nonce: metaTxRequest.nonce.toString(),
        value: metaTxRequest.value.toString(),
      };
      const res = await VendorsService.executeMetaTxRequest({
        metaTxRequest: payload,
      });
      return res?.data;
    },

    updateStatus: async (
      voucherType,
      beneficiaryAddress,
      referralVoucherAddress
    ) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELProject, ERC2771Forwarder },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELProject
      );

      const ForwarderContractInstance = await createContractInstance(
        RPC_URL,
        ERC2771Forwarder
      );

      let metaTxRequest;
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "revertedClaims",
          [beneficiaryAddress]
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "revertedRefereedClaims",
          [beneficiaryAddress, referralVoucherAddress]
        );
      }

      const payload = {
        ...metaTxRequest,
        gas: metaTxRequest.gas.toString(),
        nonce: metaTxRequest.nonce.toString(),
        value: metaTxRequest.value.toString(),
      };
      await VendorsService.executeMetaTxRequest({
        metaTxRequest: payload,
      });
    },

    logoutTransactions: () => {
      set({ vendorTransactions: [], transactions: [] });
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
