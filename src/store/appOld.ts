// import { Drivers, Storage } from "@ionic/storage";
// import { getKey, logOut } from "@utils/sessionManager";
// import { HDNodeWallet, Wallet } from "ethers";
// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import {
//   IProjectSettingsContractsApiResponse,
//   IProjectSettingsNetwork,
// } from "../types/project-settings";
// import { axiosInstance } from "@utils/axios";
// import { ITransactionItem, Status } from "../types/transactions";
// import { IBeneficiary } from "../types/beneficiaries";
// import { getWalletUsingMnemonic, signMessage } from "@utils/web3";
// import VendorsService from "@services/vendors";
// import { fixProjectUrl, setTransactionStatus } from "@utils/helperFunctions";
// import ProjectsService from "@services/projects";

// type StorageProjectSettings = {
//   baseUrl?: string;
//   network?: IProjectSettingsNetwork;
//   contracts?: IProjectSettingsContractsApiResponse;
//   projectId?: string;
//   internetAccess?: boolean;
// } | null;

// type StorageOfflineTasks = {
//   payload: any;
//   callFn: any;
//   params: any[];
// } | null;

// export type AppStateType = {
//   chainData: any;
//   isAuthenticated: boolean;
//   isInitialized: boolean;
//   wallet: Wallet | HDNodeWallet | undefined;
//   currentUser: any | undefined;
//   claimId: string | undefined;
//   beneficiary: string | undefined;
//   storage: Storage | null;
//   txStorage: Storage | null;
//   contractsFn: any;
//   projectSettings: StorageProjectSettings;
//   offlineTasks: any;
//   transactions: [ITransactionItem] | [];
//   beneficiaries: [IBeneficiary] | [];
// };

// type AppActionsType = {
//   initialize: () => Promise<void>;
//   saveCurrentUser: (user: any) => Promise<void>;
//   saveWallet: (wallet: any) => void;
//   toggleIsAuthenticated: () => void;
//   setClaimId: (beneficiary: string, claimId: string) => void;
//   setInternetAccess: (value: boolean) => void;
//   addTransaction: (data: object) => Promise<void>;
//   setTransactions: (data: object) => Promise<void>;
//   getVendorTransactionsList: (
//     address: string
//   ) => Promise<ITransactionItem[] | []>;
//   getTransactionsList: () => Promise<[]> | Promise<void>;
//   getTransaction: (id: string) => Promise<void>;
//   getPendingOfflineTransactions: () => Promise<[] | ITransactionItem[]>;
//   setProjectSettings: (value: StorageProjectSettings) => Promise<void>;
//   getProjectSettings: () => Promise<void>;
//   setWallet: (wallet: any) => void;
//   setTasks: (key: string, value: StorageOfflineTasks) => Promise<void>;
//   setChainData: (data: any) => void;
//   syncTransactions: () => Promise<void>;
//   syncBeneficiaries: () => Promise<void>;
//   setBeneficiariesList: (data: any) => void;
//   logout: () => void;
//   chargeBeneficiary: (payload: ITransactionItem) => Promise<void>;
// };

// export type AppStoreType = AppStateType & AppActionsType;

// const useAppStore = create<AppStoreType>()(
//   devtools((set, get) => ({
//     chainData: {
//       allowance: 0,
//       balance: 0,
//       distributed: 0,
//       isVendorApproved: false,
//     },
//     offlineTasks: null,
//     storage: null,
//     txStorage: null,
//     isInitialized: false,
//     isAuthenticated: false,
//     claimId: undefined,
//     beneficiary: undefined,
//     projectSettings: null,
//     wallet: undefined,
//     currentUser: undefined,
//     contractsFn: undefined,
//     transactions: [],
//     beneficiaries: [],

//     initialize: async () => {
//       const store = new Storage({
//         driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
//         name: "RahatVendor",
//         version: 1,
//       });
//       const txStore = new Storage({
//         driverOrder: [Drivers.LocalStorage],
//         name: "RahatVendorTransactions",
//         version: 1,
//       });
//       const storageInstance = await store.create();
//       const txStorageInstance = await txStore.create();
//       set({ storage: storageInstance });
//       set({ txStorage: txStorageInstance });

//       try {
//         const currentUser = await storageInstance?.get("currentUser");
//         const projectSettings = await storageInstance?.get("projectSettings");
//         const wallet = await storageInstance?.get("wallet");
//         const beneficiaries = await storageInstance?.get("beneficiaries");
//         const chainData = await txStorageInstance?.get("chainData");
//         const transactions = await txStorageInstance?.get("transactions");

//         if (wallet) {
//           set({
//             wallet,
//           });
//         }

//         if (beneficiaries) {
//           set({ beneficiaries });
//         }

//         if (currentUser) {
//           set({ currentUser });
//         }

//         if (projectSettings) {
//           set({ projectSettings });
//           if (projectSettings?.baseUrl) {
//             axiosInstance.defaults.baseURL = fixProjectUrl(
//               projectSettings.baseUrl
//             );
//           }
//         }

//         if (chainData) {
//           set({ chainData });
//         }

//         if (transactions) {
//           if (wallet) {
//             const { getVendorTransactionsList, wallet } = get();
//             const vendorTransactions = await getVendorTransactionsList(
//               wallet?.address
//             );
//             set({ transactions: vendorTransactions });
//           }
//         }
//         set({
//           isInitialized: true,
//           isAuthenticated: !!currentUser && !!wallet,
//         });
//       } catch (error) {
//         console.log("APP STORE INITIALIZE ERROR", error);
//       }
//     },

//     saveCurrentUser: async (user: any) => {
//       set({ currentUser: user });
//       const { storage } = get();
//       if (storage) {
//         await storage.set("currentUser", user);
//       }
//     },

//     saveWallet: (wallet: any) => {
//       if (!wallet) wallet = getKey("wallet");
//       set({ wallet });
//       get().storage?.set("wallet", wallet);
//     },

//     toggleIsAuthenticated: () => {
//       const { isAuthenticated } = get();
//       set({ isAuthenticated: !isAuthenticated });
//     },

//     setClaimId: (beneficiary, claimId) => {
//       set({ beneficiary, claimId });
//       get().storage?.set("beneficiary", beneficiary);
//     },

//     setWallet: (wallet: any) => {
//       set({ wallet });
//       get().storage?.set("wallet", wallet);
//     },

//     setProjectSettings: async (value: StorageProjectSettings) => {
//       set((state) => ({
//         projectSettings: { ...state.projectSettings, ...value },
//       }));
//       const { storage } = get();
//       const data = await storage?.get("projectSettings");
//       if (storage) await storage.set("projectSettings", { ...data, ...value });
//       if (value?.baseUrl)
//         axiosInstance.defaults.baseURL = fixProjectUrl(value.baseUrl);
//     },

//     getProjectSettings: async () => {
//       return get()?.storage?.get("projectSettings");
//     },

//     addTransaction: async (data) => {
//       const { txStorage, wallet, getVendorTransactionsList } = get();
//       if (txStorage) {
//         const currentTransactions = await txStorage?.get("transactions");
//         let payload;
//         if (currentTransactions?.length) {
//           payload = [...currentTransactions, data];
//           await txStorage?.set("transactions", payload);
//         } else {
//           payload = [data];
//           await txStorage?.set("transactions", payload);
//         }
//         const vendorTransactions = await getVendorTransactionsList(
//           wallet?.address
//         );
//         set({ transactions: vendorTransactions });
//       }
//     },

//     setTransactions: async (data: ITransactionItem[]) => {
//       const { txStorage, getVendorTransactionsList, wallet } = get();
//       if (txStorage) {
//         await txStorage?.set("transactions", data);
//         const vendorTransactions = await getVendorTransactionsList(
//           wallet?.address
//         );
//         set({ transactions: vendorTransactions });
//       }
//     },

//     getVendorTransactionsList: async (vendorWalletAddress: string) => {
//       const { getTransactionsList } = get();
//       const transactions = await getTransactionsList();
//       if (!transactions?.length) return [];
//       const filteredTransactions = transactions.filter(
//         (transaction) => transaction.vendorWalletAddress === vendorWalletAddress
//       );
//       return filteredTransactions;
//     },

//     getTransactionsList: async () => {
//       const { txStorage } = get();
//       let transactions = [];
//       if (txStorage) {
//         transactions = await txStorage.get("transactions");
//       }
//       return transactions;
//     },

//     getTransaction: async (id) => {
//       const { txStorage } = get();
//       let transaction;
//       if (txStorage) {
//         const transactions = await txStorage.get("transactions");
//         transaction = transactions.filter((el: any) => el.id === id);
//       }
//       return transaction;
//     },

//     setChainData: (data) => {
//       set({ chainData: data });
//       get().txStorage?.set("chainData", data);
//     },

//     setTasks: async (key: string, value: StorageOfflineTasks) => {
//       const { storage, projectSettings } = get();

//       if (projectSettings?.internetAccess) {
//         if (value?.callFn && value?.params) {
//           const res = await value?.callFn(...value?.params);
//           return res;
//         } else {
//           console.log("Function or parameters are not defined");
//           throw new Error("Function or parameters are not defined");
//         }
//       }
//       if (!projectSettings?.internetAccess && storage) {
//         let currentTasks = await storage?.get("offlineTasks");
//         if (currentTasks) {
//           const payload = {
//             ...currentTasks,
//             [key]: [
//               {
//                 ...value,
//                 callFn: value?.callFn.toString(), // Serialize the function to a string
//               },
//             ],
//           };
//           return storage?.set("offlineTasks", payload);
//         } else {
//           const payload = {
//             [key]: [
//               {
//                 ...value,
//                 callFn: value?.callFn.toString(), // Serialize the function to a string
//               },
//             ],
//           };
//           return storage?.set("offlineTasks", payload);
//         }
//       }
//     },

//     setInternetAccess: async (value) => {
//       set((state) => {
//         return {
//           projectSettings: { ...state.projectSettings, internetAccess: value },
//         };
//       });
//       const currentProjectSettings = await get().storage?.get(
//         "projectSettings"
//       );
//       get().storage?.set("projectSettings", {
//         ...currentProjectSettings,
//         internetAccess: value,
//       });
//     },

//     async getPendingOfflineTransactions() {
//       // only get vendor's offline transactions with status = NEW || FAIL
//       const transactions = await get().getTransactionsList();
//       const wallet = get().wallet;

//       if (!transactions?.length) return [];

//       const cond1 = (item: any) => item.isOffline;
//       const cond2 = (item: any) =>
//         item.status === "NEW" || item.status === "FAIL";
//       const cond3 = (item: any) => item.vendorWalletAddress === wallet?.address;

//       const offlineTransactions = transactions.filter(
//         (el) => cond1(el) && cond2(el) && cond3(el)
//       );

//       return offlineTransactions;
//     },

//     async syncTransactions() {
//       const transactions = await get().getTransactionsList();
//       const stateWallet = get().wallet;
//       const wallet = getWalletUsingMnemonic(stateWallet?.mnemonic?.phrase);

//       const offlineTransactions = await get().getPendingOfflineTransactions();
//       if (!offlineTransactions?.length)
//         throw new Error("No pending transactions to sync");

//       const signedMessage = await signMessage({
//         wallet,
//         message: offlineTransactions,
//       });

//       const payload = {
//         message: offlineTransactions,
//         signedMessage,
//       };

//       try {
//         const res = await VendorsService.syncTransactions(payload);
//         const updatedTransactions = setTransactionStatus(
//           transactions,
//           offlineTransactions,
//           Status.SUCCESS,
//           res?.data
//         );
//         get().setTransactions(updatedTransactions);
//       } catch (error) {
//         const updatedTransactions = setTransactionStatus(
//           transactions,
//           offlineTransactions,
//           Status.FAIL
//         );
//         get().setTransactions(updatedTransactions);
//         throw error;
//       }
//     },

//     async syncBeneficiaries() {
//       const {
//         getPendingOfflineTransactions,
//         setBeneficiariesList,
//         projectSettings,
//       } = get();
//       const pendingOfflineTransactions = await getPendingOfflineTransactions();
//       if (pendingOfflineTransactions?.length)
//         throw new Error(
//           "Please sync pending offline transactions first to sync beneficiaries again"
//         );

//       const data = await ProjectsService.getProjectOfflineBeneficaries(
//         projectSettings?.contracts?.CVAProject?.address
//       );
//       setBeneficiariesList(data?.data);
//     },

//     async chargeBeneficiary(data: ITransactionItem) {
//       const stateWallet = get().wallet;
//       const transactions = get().transactions;
//       const wallet = getWalletUsingMnemonic(stateWallet?.mnemonic?.phrase);
//       const signedMessage = await signMessage({ wallet, message: data });
//       const payload = {
//         message: data,
//         signedMessage,
//       };
//       try {
//         await VendorsService.chargeBeneficiary(payload);
//         const updatedTransactions = setTransactionStatus(
//           transactions,
//           [data],
//           "SUCCESS"
//         );
//         get().setTransactions(updatedTransactions);
//       } catch (error) {
//         const updatedTransactions = setTransactionStatus(
//           transactions,
//           [data],
//           "FAIL"
//         );
//         get().setTransactions(updatedTransactions);
//         throw error;
//       }
//     },

//     async setBeneficiariesList(data) {
//       set({ beneficiaries: data });
//       await get().storage?.set("beneficiaries", data);
//     },

//     async logout() {
//       await get().storage?.clear();
//       await get().txStorage?.remove("wallet");
//       await get().txStorage?.remove("currentUser");
//       await get().txStorage?.remove("chainData");
//       set({
//         chainData: {
//           allowance: 0,
//           balance: 0,
//           distributed: 0,
//           isVendorApproved: false,
//         },
//         offlineTasks: null,
//         storage: null,
//         txStorage: null,
//         isAuthenticated: false,
//         claimId: undefined,
//         beneficiary: undefined,
//         projectSettings: null,
//         wallet: undefined,
//         currentUser: undefined,
//         contractsFn: undefined,
//         transactions: [],
//         beneficiaries: [],
//       });
//       logOut();
//       get().initialize();
//     },
//   }))
// );

// export default useAppStore;
