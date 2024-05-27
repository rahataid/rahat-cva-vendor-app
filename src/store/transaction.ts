import { createStore, ionicIdbStorage } from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore from "./app";
import {
  createContractInstance,
  getMetaTxRequest,
  getWalletUsingMnemonic,
} from "@utils/web3";
import ProjectsService from "@services/projects";
import { TransactionStoreType } from "@types/store/transaction";
import BeneficiariesService from "@services/beneficiaries";
import { MS_ACTIONS } from "@rahataid/sdk";
import { ethers } from "ethers";

const useTransactionStore = createStore<TransactionStoreType>(
  (set, get) => ({
    transactions: [],
    vendorTransactions: [],
    triggerUpdateState: false,
    referredAppStoreState: () => useAppStore.getState(),

    triggerUpdate: () => {
      set({ triggerUpdateState: !get().triggerUpdateState });
    },

    chargeBeneficiary: async (walletAddress, amount) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { cvaproject, erc2771forwarder },
          network: { rpcurl },
          projectId,
        },
      } = referredAppStoreState();

      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const CvaProjectInstance = await createContractInstance(
        rpcurl,
        cvaproject
      );

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
      );

      const metaTxRequest = await getMetaTxRequest(
        walletInstance,
        ForwarderContractInstance,
        CvaProjectInstance,
        "requestTokenFromBeneficiary(address,uint256)",
        [walletAddress, ethers.parseEther(amount.toString())]
      );

      const payload = {
        action: MS_ACTIONS.ELPROJECT.REDEEM_VOUCHER,
        payload: {
          metaTxRequest: {
            ...metaTxRequest,
            gas: metaTxRequest.gas.toString(),
            nonce: metaTxRequest.nonce.toString(),
            value: metaTxRequest.value.toString(),
          },
        },
      };
      const metaRes = await ProjectsService.actions(projectId, payload);
      return { ...metaRes?.data?.data };

      // let beRes;
      // if (metaRes?.data?.data?.status === 1) {
      //   const payload2 = {
      //     action: MS_ACTIONS.ELPROJECT.UPDATE_STATUS,
      //     payload: {
      //       uuid: "d677fde2-850c-4225-8472-f892b6f2f52b",
      //     },
      //   };
      //   beRes = await ProjectsService.actions(projectId, payload2);
      // }

      // return { ...beRes?.data?.data, ...metaRes?.data?.data };
    },

    getBeneficiaryClaims: async (walletAddress) => {
      const { referredAppStoreState } = get();
      const {
        projectSettings: {
          contracts: { cvaproject },
          network: { rpcurl },
        },
      } = referredAppStoreState();
      const CvaProjectInstance = await createContractInstance(
        rpcurl,
        cvaproject
      );
      const balance = await CvaProjectInstance.beneficiaryClaims.staticCall(
        walletAddress
      );
      return parseInt(ethers.formatEther(balance));
    },

    getClaimCount: async () => {
      const { referredAppStoreState } = get();
      const {
        projectSettings: {
          contracts: { rahatclaim },
          network: { rpcurl },
        },
      } = referredAppStoreState();
      const RahatClaimInstance = await createContractInstance(
        rpcurl,
        rahatclaim
      );
      const claims = await RahatClaimInstance.claimCount.staticCall();
      return Number(claims);
    },

    verifyOtp: async (otp, beneficiaryAddress) => {
      //processTokenRequest
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { cvaproject, erc2771forwarder },
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
      // return res;
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const CvaProjectInstance = await createContractInstance(
        rpcurl,
        cvaproject
      );

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
      );

      const metaTxRequest = await getMetaTxRequest(
        walletInstance,
        ForwarderContractInstance,
        CvaProjectInstance,
        "processTokenRequest",
        [beneficiaryAddress, otp]
      );
      const payload = {
        action: MS_ACTIONS.ELPROJECT.PROCESS_OTP,
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

    getBeneficiaryDetailsByUuid: async (uuid) => {
      return BeneficiariesService.getByUuid(uuid);
    },

    getBeneficiaryDetailsByWallet: async (address) => {
      return BeneficiariesService.getByWallet(address);
    },

    getBeneficiaryDetailsByPhone: async (phone) => {
      return BeneficiariesService.getByPhone(phone);
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
