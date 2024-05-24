import { createStore, ionicIdbStorage } from "@utils/storeUtils";
import { createJSONStorage } from "zustand/middleware";
import useAppStore from "./app";
import {
  createContractInstance,
  createContractInstanceFromWallet,
  generateMultiCallData,
  getMetaTxRequest,
  getWalletUsingMnemonic,
} from "@utils/web3";
import {
  BENEFICIARY_TYPE,
  REFER_BENEFICIARY_DETAILS,
  VOUCHER,
} from "@types/beneficiaries";
import ProjectsService from "@services/projects";
import {
  TransactionStoreType,
  addToProjectPayload,
} from "@types/store/transaction";
import BeneficiariesService from "@services/beneficiaries";
import { MS_ACTIONS } from "@rahataid/sdk";
import {
  fixBeneficiaryVoucherResult,
  fixVoucherCount,
} from "@utils/helperFunctions";

const useTransactionStore = createStore<TransactionStoreType>(
  (set, get) => ({
    transactions: [],
    vendorTransactions: [],
    triggerUpdateState: false,
    referredAppStoreState: () => useAppStore.getState(),

    triggerUpdate: () => {
      set({ triggerUpdateState: !get().triggerUpdateState });
    },

    fetchBeneficiaryVoucherDetails: async (walletAddress) => {
      const { referredAppStoreState } = get();
      const {
        projectSettings: {
          contracts: { elproject },
          network: { rpcurl },
        },
      } = referredAppStoreState();

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);
      let res;

      res = await ElProjectInstance.getBeneficiaryVoucherDetail.staticCall(
        walletAddress
      );
      const beneficiaryVoucher = fixBeneficiaryVoucherResult(res);
      return beneficiaryVoucher;
    },

    chargeBeneficiary: async () => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { cvaproject, erc2771forwarder },
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

      const CvaProjectInstance = await createContractInstance(
        rpcurl,
        cvaproject
      );

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
      );

      console.log("CVA INSTANCE===>", CvaProjectInstance);
      console.log("FORARDER INSTANCE===>", ForwarderContractInstance);

      const metaTxRequest = await getMetaTxRequest(
        walletInstance,
        ForwarderContractInstance,
        CvaProjectInstance,
        "requestTokenFromBeneficiary(address,uint256)",
        // [beneficiary?.walletAddress]
        ["0x7597950bF1bC79C40247A1C21c367DB345234164", 1]
      );

      console.log("META==>", metaTxRequest);

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
      return metaRes;

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

    getBeneficiaryClaims: async () => {
      const { referredAppStoreState } = get();
      const {
        projectSettings: {
          contracts: { cvaproject },
          network: { rpcurl },
        },
      } = referredAppStoreState();

      // const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const CvaProjectInstance = await createContractInstance(
        rpcurl,
        cvaproject
      );

      console.log(CvaProjectInstance);

      const balance = await CvaProjectInstance.beneficiaryClaims.staticCall(
        "0x7597950bF1bC79C40247A1C21c367DB345234164"
      );

      console.log("BALANCE====>", balance);
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
      console.log(claims, "CLAIMS=====>");
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

      let beRes;
      if (metaRes?.data?.data?.status === 1) {
        const payload2 = {
          action: MS_ACTIONS.ELPROJECT.UPDATE_STATUS,
          payload: {
            eyeCheckUp,
            glassStatus,
            uuid: beneficiary?.uuid,
          },
        };
        beRes = await ProjectsService.actions(projectId, payload2);
      }
      return { ...beRes?.data?.data, ...metaRes?.data?.data };
    },

    referBeneficiaries: async ({
      referredBeneficiaries,
      beneficiaryAddress,
      beneficiaryDetails,
    }) => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          projectId,
          contracts: { elproject, erc2771forwarder, referralvoucher },
          network: { rpcurl },
        },
        currentUser: { uuid: vendorId },
      } = referredAppStoreState();
      const formattedBeneficiaries = referredBeneficiaries.map(
        (beneficiary) => {
          return {
            age: +beneficiary?.estimatedAge,
            gender: beneficiary?.gender,
            piiData: {
              name: beneficiary?.name,
              phone: beneficiary?.phone,
            },
          };
        }
      );
      const bePayload = {
        action: "beneficiary.bulk_add_to_project",
        payload: {
          beneficiaries: formattedBeneficiaries,
          referrerBeneficiary: beneficiaryDetails?.uuid,
          referrerVendor: vendorId,
          projectUuid: projectId,
          type: BENEFICIARY_TYPE.REFERRED,
        },
      };
      const beRes = await ProjectsService.actions(projectId, bePayload);

      if (!beRes) throw new Error("Backend response is empty");

      // contract call
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);

      const ForwarderContractInstance = await createContractInstance(
        rpcurl,
        erc2771forwarder
      );

      let multiCallInfo = beRes?.data?.data?.insertedData?.map((response) => {
        return [
          response?.walletAddress,
          beneficiaryAddress,
          walletInstance?.address,
          referralvoucher?.address,
        ];
      });

      const multiCallData = generateMultiCallData(
        ElProjectInstance,
        "assignRefereedClaims",
        multiCallInfo
      );

      const metaTxRequest = await getMetaTxRequest(
        walletInstance,
        ForwarderContractInstance,
        ElProjectInstance,
        "multicall",
        [multiCallData]
      );

      const response = await ProjectsService.actions(projectId, {
        action: MS_ACTIONS.ELPROJECT.ASSIGN_DISCOUNT_VOUCHER,
        payload: {
          metaTxRequest: {
            ...metaTxRequest,
            gas: metaTxRequest.gas.toString(),
            nonce: metaTxRequest.nonce.toString(),
            value: metaTxRequest.value.toString(),
          },
        },
      });

      const payload = referredBeneficiaries.map((el) => ({
        ...el,
        transactionHash: response?.data?.data?.txHash || "",
      }));
      return payload;
      // const blockChainResponse = [];
      // for (const beneficiary of referredBeneficiaries) {
      //   const metaTxRequest = await getMetaTxRequest(
      //     walletInstance,
      //     ForwarderContractInstance,
      //     ElProjectInstance,
      //     "assignRefereedClaims",
      //     [
      //       beneficiary.walletAddress,
      //       beneficiaryAddress,
      //       walletInstance?.address,
      //       referralvoucher?.address,
      //     ]
      //   );
      //   const response = await ProjectsService.actions(projectId, {
      //     action: MS_ACTIONS.ELPROJECT.ASSIGN_DISCOUNT_VOUCHER,
      //     payload: {
      //       metaTxRequest: {
      //         ...metaTxRequest,
      //         gas: metaTxRequest.gas.toString(),
      //         nonce: metaTxRequest.nonce.toString(),
      //         value: metaTxRequest.value.toString(),
      //       },
      //     },
      //   });
      //   payload.push({
      //     ...beneficiary,
      //     transactionHash: response?.data?.data?.txHash || "",
      //   });
      //   blockChainResponse.push(response);
      // }
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
        action: MS_ACTIONS.ELPROJECT.REQUEST_REDEMPTION,
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
      if (metaRes?.data?.data?.status === 1) {
        const payload2 = {
          action: MS_ACTIONS.ELPROJECT.REQUEST_REDEMPTION_BE,
          payload: {
            vendorId,
            adminAddress,
            voucherNumber: +amount,
            voucherType:
              voucherType === VOUCHER.FREE_VOUCHER
                ? "FREEVOUCHER"
                : "DISCOUNTVOUCHER",
          },
        };
      }
      return metaRes?.data?.data;
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

    checkIsVendorApproved: async () => {
      const { referredAppStoreState } = get();
      const {
        wallet,
        projectSettings: {
          contracts: { elproject },
          network: { rpcurl },
        },
      } = referredAppStoreState();

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);

      const isApproved = await ElProjectInstance.checkVendorStatus.staticCall(
        wallet?.address
      );
      return isApproved;
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
        action: MS_ACTIONS.ELPROJECT.GET_VENDOR_REFERRER,
        payload: {
          vendorId,
        },
      };
      return ProjectsService.actions(projectId, payload);
    },

    getBeneficiaryReferredDetailsByUuid: async (benId: string) => {
      const { referredAppStoreState } = get();
      const {
        projectSettings: { projectId },
      } = referredAppStoreState();
      const payload = {
        action: "beneficiary.project_specific",
        payload: {
          benId,
        },
      };
      return ProjectsService.actions(projectId, payload);
    },

    getBeneficiaryDetailsByUuid: async (uuid: string) => {
      return BeneficiariesService.getByUuid(uuid);
    },

    getBeneficiaryDetailsByWallet: async (address: string) => {
      return BeneficiariesService.getByWallet(address);
    },

    getVendorVoucherDetails: async (walletAddress: string) => {
      const { referredAppStoreState } = get();
      const {
        projectSettings: {
          contracts: { elproject },
          network: { rpcurl },
        },
      } = referredAppStoreState();

      const ElProjectInstance = await createContractInstance(rpcurl, elproject);
      let vendorVoucherDetails =
        await ElProjectInstance.getVendorVoucherDetail.staticCall(
          walletAddress
        );
      return fixVoucherCount(vendorVoucherDetails);
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
