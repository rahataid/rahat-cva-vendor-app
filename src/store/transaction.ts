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
  getVendorVoucherRedemptionCount: (voucherType: VOUCHER) => Promise<number>;
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
          contracts: { elproject, erc2771forwarder },
          network: { rpcurl },
          projectId,
        },
      } = referredAppStoreState();

      // const ElProjectInstance = await createContractInstance(
      //   RPC_URL,
      //   elproject
      // );

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, elproject);

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
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
          contracts: { elproject, erc2771forwarder },
          projectId,
          network: { rpcurl },
        },
      } = referredAppStoreState();

      // const ElProjectInstance =
      //   await createContractInstanceUsingRahatAdminWallet(RPC_URL, elproject);
      // const res = await ElProjectInstance.procesTokenRequest(
      //   beneficiaryAddress,
      //   otp
      // );
      // console.log("RES", res);
      // return res;
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
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
          contracts: { elproject, erc2771forwarder },
          network: { rpcurl },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);

      const ForwarderContractInstance = await createContractInstanceFromWallet(
        rpcurl,
        erc2771forwarder,
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
          contracts: { elproject, erc2771forwarder, referralvoucher },
          network: { rpcurl },
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
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
      console.log({ backendResponse });
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
            referralvoucher?.address,
          ]
        );
        console.log(
          "=====",
          beneficiary.walletAddress,
          beneficiaryAddress,
          walletInstance?.address,
          referralvoucher?.address,
          "====="
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
        console.log("RESPONSE", response);
        payload.push({
          ...beneficiary,
          createdAt:
            response?.data?.data?.timestamp || generateCurrentTimestamp(),
          transactionHash: response?.data?.data?.hash || "",
        });
        blockChainResponse.push(response);
      }
      return payload;
    },

    transferVoucher: async ({ voucherType, amount }) => {
      console.log("TRANSFER VOUCHER", voucherType, amount);
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { eyevoucher, referralvoucher, erc2771forwarder },
          network: { rpcurl },
          admin: { address: adminAddress },
          projectId,
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);
      console.log(wallet?.address, walletInstance?.address);
      const forwarderContractInstance = await createContractInstanceFromWallet(
        rpcurl,
        erc2771forwarder,
        walletInstance.privateKey
      );

      let metaTxRequest;
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        const eyeVoucherInstance = await createContractInstance(
          rpcurl,
          eyevoucher
        );
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          forwarderContractInstance,
          eyeVoucherInstance,
          "transferFrom",
          [wallet?.address, adminAddress, amount]
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        const referralVoucherInstance = await createContractInstance(
          rpcurl,
          referralvoucher
        );
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          forwarderContractInstance,
          referralVoucherInstance,
          "transferFrom",
          [wallet?.address, adminAddress, amount]
        );
      }
      console.log("here meta tx created");
      const payload = {
        action: "elProject.requestRedemption",
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
      return res?.data?.data;
    },

    getVendorVoucherRedemptionCount: async (voucherType) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { eyevoucher, referralvoucher },
          network: { rpcurl },
        },
      } = referredAppStoreState();
      let voucherCount;
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        const eyeVoucherInstance = await createContractInstance(
          rpcurl,
          eyevoucher,
          "useRahatTokenAbi"
        );
        console.log(eyeVoucherInstance, "===");
        voucherCount = await eyeVoucherInstance.balanceOf(wallet?.address);
        console.log(voucherCount, "====-=====");
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        const referralvoucherInstance = await createContractInstance(
          rpcurl,
          referralvoucher,
          "useRahatTokenAbi"
        );
        console.log(referralvoucherInstance, "===");
        voucherCount = await referralvoucherInstance.balanceOf(wallet?.address);
        console.log(voucherCount, "====-=====");
      }
      return voucherCount;
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
