import { ITransactionItem } from "@types/transactions";
import { createStore, ionicIdbStorage } from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore, { AppStoreType } from "./app";
import {
  createContractInstance,
  createContractInstanceFromWallet,
  generateUuid,
  getMetaTxRequest,
  getWalletUsingMnemonic,
} from "@utils/web3";
import {
  BENEFICIARY_ADDRESS,
  PROJECT_ID,
  RPC_URL,
  VENDOR_ADDRESS,
} from "../config";
import {
  BENEFICIARY_VOUCHER_DETAILS,
  CreateBeneficiaryDto,
  REFER_BENEFICIARY_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import ProjectsService from "@services/projects";
import { generateCurrentTimestamp } from "../utils/helperFunctions";

export type TransactionStoreType = TransactionStateType &
  TransactionActionsType;

export type TransactionStateType = {
  transactions: ITransactionItem[] | [];
  vendorTransactions: ITransactionItem[] | [];
  triggerUpdateState: boolean;
};

export type ReferProps = {
  beneficiaryAddress: string;
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
  beneficiaryAddress: string;
  voucher?: BENEFICIARY_VOUCHER_DETAILS;
  voucherType: VOUCHER;
  eyeCheckUp: boolean;
  glassStatus: boolean;
  uuid: string;
};

type addToProjectPayload = {
  action: string;
  payload: CreateBeneficiaryDto;
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
    beneficiaryAddress,
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
      beneficiaryAddress,
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
          contracts: { ELPROJECT, ERC2771FORWARDER },
          network,
        },
      } = referredAppStoreState();

      // const ElProjectInstance = await createContractInstance(
      //   RPC_URL,
      //   ELPROJECT
      // );

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, ELPROJECT);

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELPROJECT
      );

      const ForwarderContractInstance = await createContractInstance(
        RPC_URL,
        ERC2771FORWARDER
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
          [beneficiaryAddress]
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
          [beneficiaryAddress, voucher?.ReferredVoucherAddress]
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
          contracts: { ELPROJECT, ERC2771FORWARDER },
        },
      } = referredAppStoreState();

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, ELPROJECT);
      // const res = await ElProjectInstance.procesTokenRequest(
      //   beneficiaryAddress,
      //   otp
      // );
      // console.log("RES", res);
      // return res;
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELPROJECT
      );

      const ForwarderContractInstance = await createContractInstance(
        RPC_URL,
        ERC2771FORWARDER
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

      const res = await ProjectsService.actions(PROJECT_ID, payload);
      return res?.data;
    },

    updateStatus: async ({
      voucherType,
      beneficiaryAddress,
      referralVoucherAddress,
      eyeCheckUp,
      glassStatus,
      uuid,
    }) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELPROJECT, ERC2771FORWARDER },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELPROJECT
      );

      const ForwarderContractInstance = await createContractInstanceFromWallet(
        RPC_URL,
        ERC2771FORWARDER,
        walletInstance.privateKey
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
      beneficiaryAddress,
    }) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELPROJECT, ERC2771FORWARDER },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(
        RPC_URL,
        ELPROJECT
      );

      const ForwarderContractInstance = await createContractInstance(
        RPC_URL,
        ERC2771FORWARDER
      );

      async function processBeneficiaries(
        referredBeneficiaries: REFER_BENEFICIARY_DETAILS[]
      ) {
        const promises = referredBeneficiaries.map(async (beneficiary) => {
          const payload: addToProjectPayload = {
            action: "beneficiary.add_to_project",
            payload: {
              uuid: generateUuid(),
              walletAddress: beneficiary.walletAddress,
              referrerBeneficiary: generateUuid(),
              referrerVendor: generateUuid(),
              type: "REFERRED",
            },
          };
          return ProjectsService.actions(PROJECT_ID, payload);
        });
        return await Promise.all(promises);
      }

      const backendResponse = await processBeneficiaries(referredBeneficiaries);
      console.log(backendResponse, "backendResponse");

      // contract call

      const blockChainResponse = [];
      const payload = [];
      for (const beneficiary of referredBeneficiaries) {
        const metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "assignRefereedClaims",
          [
            beneficiary.walletAddress,
            beneficiaryAddress,
            VENDOR_ADDRESS,
            "0x3BB2526e0B8f8bD46b0187Aa4d24b351cf434437",
          ]
        );
        const response = await ProjectsService.actions(PROJECT_ID, {
          action: "elProject.discountVoucher",
          payload: {
            metaTxRequest: {
              ...metaTxRequest,
              gas: metaTxRequest.gas.toString(),
              nonce: metaTxRequest.nonce.toString(),
              value: metaTxRequest.value.toString(),
            },
          },
        });
        console.log("response", response);
        payload.push({
          ...beneficiary,
          createdAt:
            response?.data?.data?.timestamp || generateCurrentTimestamp(),
          transactionHash: response?.data?.data?.hash || "",
        });
        blockChainResponse.push(response);
      }
      console.log(payload);
      return payload;
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
