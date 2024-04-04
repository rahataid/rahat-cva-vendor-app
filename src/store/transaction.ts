import { createStore, ionicIdbStorage } from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore from "./app";
import {
  createContractInstance,
  createContractInstanceFromWallet,
  generateUuid,
  getMetaTxRequest,
  getWalletUsingMnemonic,
} from "@utils/web3";
import {
  BENEFICIARY_TYPE,
  REFER_BENEFICIARY_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import ProjectsService from "@services/projects";
import { generateCurrentTimestamp } from "../utils/helperFunctions";
import {
  TransactionStoreType,
  addToProjectPayload,
} from "@types/store/transaction";
import BeneficiariesService from "@services/beneficiaries";

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
      beneficiary,
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
      console.log(
        walletInstance,
        ForwarderContractInstance,
        ElProjectInstance,
        "requestTokenFromBeneficiary(address)",
        beneficiary?.walletAddress
      );
      if (voucherType === VOUCHER.FREE_VOUCHER) {
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "requestTokenFromBeneficiary(address)",
          [beneficiary?.walletAddress]
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "requestReferredTokenFromBeneficiary",
          [beneficiary?.walletAddress, voucher?.ReferredVoucherAddress]
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
          uuid: beneficiary?.uuid,
        },
      };
      return ProjectsService.actions(projectId, payload);
    },

    updateStatus: async ({
      voucherType,
      beneficiary,
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
          [beneficiary?.walletAddress]
        );
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        metaTxRequest = await getMetaTxRequest(
          walletInstance,
          ForwarderContractInstance,
          ElProjectInstance,
          "revertedRefereedClaims",
          [beneficiary?.walletAddress, referralVoucherAddress]
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
          uuid: beneficiary?.uuid,
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
              walletAddress: beneficiary.walletAddress,
              referrerBeneficiary: generateUuid(),
              referrerVendor: generateUuid(),
              // age: beneficiary?.estimatedAge,
              piiData: {
                name: beneficiary?.name,
                phone: beneficiary?.phone,
              },
              type: BENEFICIARY_TYPE.REFERRED,
            },
          };
          return ProjectsService.actions(projectId, payload);
        });
        return await Promise.all(promises);
      }

      const backendResponse = await processBeneficiaries(referredBeneficiaries);
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

    transferVoucher: async ({ voucherType, amount }) => {
      const { referredAppStoreState } = get();
      const {
        currentUser: { uuid: vendorId },
        wallet,
        projectSettings: {
          contracts: { eyevoucher, referralvoucher, erc2771forwarder },
          network: { rpcurl },
          admin: { address: adminAddress },
          projectId,
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);
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
          "transfer",
          [adminAddress, amount]
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
          "transfer",
          [adminAddress, amount]
        );
      }
      const payload = {
        action: "elProject.requestRedemption",
        payload: {
          metaTxRequest: {
            ...metaTxRequest,
            gas: metaTxRequest.gas.toString(),
            nonce: metaTxRequest.nonce.toString(),
            value: metaTxRequest.value.toString(),
          },
          vendorId,
          adminAddress,
          voucherNumber: +amount,
          voucherType:
            voucherType === VOUCHER.FREE_VOUCHER
              ? "FREEVOUCHER"
              : "DISCOUNTVOUCHER",
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
        voucherCount = await eyeVoucherInstance.balanceOf(wallet?.address);
      } else if (voucherType === VOUCHER.DISCOUNT_VOUCHER) {
        const referralvoucherInstance = await createContractInstance(
          rpcurl,
          referralvoucher,
          "useRahatTokenAbi"
        );
        voucherCount = await referralvoucherInstance.balanceOf(wallet?.address);
      }
      return voucherCount;
    },

    getVendorRedemptionList: async () => {
      const { referredAppStoreState } = get();
      const {
        currentUser: { uuid: vendorId },
        projectSettings: { projectId },
      } = referredAppStoreState();

      const payload = {
        action: MS_ACTIONS.ELPROJECT.GET_VENDOR_REDEMPTION,
        payload: {
          vendorId,
        },
      };
      return ProjectsService.actions(projectId, payload);
    },

    getReferredBeneficiaryList: async () => {
      const { referredAppStoreState } = get();
      const {
        currentUser: { uuid: vendorId },
        projectSettings: { projectId },
      } = referredAppStoreState();

      const payload = {
        action: "elProject.beneficiaryReferred",
        payload: {
          vendorId,
        },
      };
      return ProjectsService.actions(projectId, payload);
    },

    getReferredBeneficiaryDetails: async (uuid: string) => {
      return BeneficiariesService.getByUuid(uuid);
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
