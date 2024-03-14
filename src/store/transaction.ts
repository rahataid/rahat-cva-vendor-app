import { ITransactionItem } from "@types/transactions";
import { createStore, ionicIdbStorage } from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore, { AppStoreType } from "./app";
import {
  createContractInstance,
  getMetaTxRequest,
  getWalletUsingMnemonic,
} from "@utils/web3";
import { BENEFICIARY_ADDRESS, PROJECT_ID, RPC_URL } from "../config";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  REFER_BENEFICIARY_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import ProjectsService from "@services/projects";

export type TransactionStoreType = TransactionStateType &
  TransactionActionsType;

export type TransactionStateType = {
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
  triggerUpdateState: boolean;
};

export type ReferProps = {
  beneficiary: string;
  referredBeneficiaries: REFER_BENEFICIARY_DETAILS[];
  voucher: BENEFICIARY_VOUCHER_DETAILS;
};

export type UpdateStatusProps = {
  voucherType: VOUCHER;
  beneficiaryAddress: string;
  referralVoucherAddress?: string;
  eyeCheckUp: boolean;
  glassStatus: boolean;
  uuid: string;
};

export type RedeemVoucherProps = {
  voucher?: BENEFICIARY_VOUCHER_DETAILS;
  voucherType: VOUCHER;
  eyeCheckUp: boolean;
  glassStatus: boolean;
  uuid: string;
};

type TransactionActionsType = {
  referredAppStoreState: () => AppStoreType;
  triggerUpdate: () => void;
  redeemVoucher: ({
    voucherType,
    voucher,
    eyeCheckUp,
    glassStatus,
    uuid,
  }: RedeemVoucherProps) => Promise<any>;
  verifyOtp: (otp: string, beneficiaryAddress: string) => Promise<any>;
  updateStatus: ({
    voucherType,
    beneficiaryAddress,
    referralVoucherAddress,
    eyeCheckUp,
    glassStatus,
    uuid,
  }: UpdateStatusProps) => Promise<any>;
  referBeneficiaries: ({
    beneficiary,
    referredBeneficiaries,
    voucher,
  }: ReferProps) => Promise<any>;
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

    redeemVoucher: async ({
      voucherType,
      voucher,
      eyeCheckUp,
      glassStatus,
      uuid,
    }) => {
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
        action: "elProject.redeemVoucher",
        payload: {
          metaTxRequest: {
            ...metaTxRequest,
            gas: metaTxRequest.gas.toString(),
            nonce: metaTxRequest.nonce.toString(),
            value: metaTxRequest.value.toString(),
          },
          eyeCheckUp,
          glassStatus,
          uuid,
        },
      };
      return ProjectsService.actions(PROJECT_ID, payload);
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
        action: "elProject.processOtp",
        payload: {
          metaTxRequest: {
            ...metaTxRequest,
            gas: metaTxRequest.gas.toString(),
            nonce: metaTxRequest.nonce.toString(),
            value: metaTxRequest.value.toString(),
          },
        },
      };

      return ProjectsService.actions(PROJECT_ID, payload);
    },

    updateStatus: async ({
      voucherType,
      beneficiaryAddress,
      referralVoucherAddress,
      eyeCheckUp,
      glassStatus,
      uuid,
    }) => {
      console.log({
        voucherType,
        beneficiaryAddress,
        referralVoucherAddress,
        eyeCheckUp,
        glassStatus,
        uuid,
      });
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
        action: "elProject.redeemVoucher",
        payload: {
          metaTxRequest: {
            ...metaTxRequest,
            gas: metaTxRequest.gas.toString(),
            nonce: metaTxRequest.nonce.toString(),
            value: metaTxRequest.value.toString(),
          },
          eyeCheckUp,
          glassStatus,
          uuid,
        },
      };
      return ProjectsService.actions(PROJECT_ID, payload);
    },

    referBeneficiaries: async ({
      referredBeneficiaries,
      voucher,
      beneficiary,
    }) => {
      console.log("REFERRED BENEFICIARIES", referredBeneficiaries);
      console.log("VOUCHER", voucher);
      console.log("beneficiary", beneficiary);
      return;
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
