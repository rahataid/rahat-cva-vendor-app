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
};

export type RedeemVoucherProps = {
  beneficiaryAddress: string;
  voucher?: BENEFICIARY_VOUCHER_DETAILS;
  voucherType: VOUCHER;
  eyeCheckUp: boolean;
  glassStatus: boolean;
};

type addToProjectPayload = {
  action: string;
  payload: CreateBeneficiaryDto;
};

type TransferVoucher = {
  voucherType: VOUCHER;
  amount: number;
};

type TransactionActionsType = {
  referredAppStoreState: () => AppStoreType;
  triggerUpdate: () => void;
  redeemVoucher: ({
    voucherType,
    voucher,
    eyeCheckUp,
    glassStatus,
  }: RedeemVoucherProps) => Promise<any>;
  verifyOtp: (otp: string, beneficiaryAddress: string) => Promise<any>;
  updateStatus: ({
    voucherType,
    beneficiaryAddress,
    referralVoucherAddress,
    eyeCheckUp,
    glassStatus,
  }: UpdateStatusProps) => Promise<any>;
  referBeneficiaries: ({
    beneficiaryAddress,
    referredBeneficiaries,
    voucher,
  }: ReferProps) => Promise<any>;
  transferVoucher: ({ voucherType, amount }: TransferVoucher) => Promise<any>;
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
    }) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELPROJECT, ERC2771FORWARDER },
          network: { RPCURL },
          projectId,
        },
      } = referredAppStoreState();

      // const ElProjectInstance = await createContractInstance(
      //   RPC_URL,
      //   ELPROJECT
      // );

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, ELPROJECT);

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(RPCURL, ELPROJECT);

      const ForwarderContractInstance = await createContractInstance(
        RPCURL,
        ERC2771FORWARDER
      );

      // let res;
      let metaTxRequest;
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "requestTokenFromBeneficiary(address)",
          [beneficiaryAddress]
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
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
          uuid: projectId,
        },
      };
      return ProjectsService.actions(projectId, payload);
    },

    verifyOtp: async (otp, beneficiaryAddress) => {
      //processTokenRequest
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { ELPROJECT, ERC2771FORWARDER },
          projectId,
        },
        network: { RPCURL },
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

      const ElProjectInstance = await createContractInstance(RPCURL, ELPROJECT);

      const ForwarderContractInstance = await createContractInstance(
        RPCURL,
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

      const res = await ProjectsService.actions(projectId, payload);
      return res?.data;
    },

    updateStatus: async ({
      voucherType,
      beneficiaryAddress,
      referralVoucherAddress,
      eyeCheckUp,
      glassStatus,
    }) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          projectId,
          contracts: { ELPROJECT, ERC2771FORWARDER },
          network: { RPCURL },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(RPCURL, ELPROJECT);

      const ForwarderContractInstance = await createContractInstanceFromWallet(
        RPCURL,
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
          uuid: projectId,
        },
      };
      return ProjectsService.actions(projectId, payload);
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
          projectId,
          contracts: { ELPROJECT, ERC2771FORWARDER, REFERRALVOUCHER },
          network: { RPCURL },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(RPCURL, ELPROJECT);

      const ForwarderContractInstance = await createContractInstance(
        RPCURL,
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
          return ProjectsService.actions(projectId, payload);
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
            walletInstance?.address,
            REFERRALVOUCHER?.ADDRESS,
          ]
        );
        const response = await ProjectsService.actions(projectId, {
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

    transferVoucher: async ({ voucherType, amount }) => {
      console.log("TRANSFER VOUHCER", voucherType, amount);
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { EYEVOUCHER, REFERRALVOUCHER },
          network: { RPCURL },
          admin: { ADDRESS: adminAddress },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      let contractInstance;

      if (voucherType === VOUCHER.FREE_VOUCHER) {
        contractInstance = await createContractInstanceFromWallet(
          RPCURL,
          REFERRALVOUCHER,
          walletInstance.privateKey
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        contractInstance = await createContractInstanceFromWallet(
          RPCURL,
          EYEVOUCHER,
          walletInstance.privateKey
        );
      }
      const res = await contractInstance.transfer(adminAddress, amount);
      return res;
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
