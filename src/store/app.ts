import {
  IProjectSettingsContractsApiResponse,
  IProjectSettingsNetwork,
} from "@types/project-settings";
import { IAddVendorPayload } from "@types/vendors";
import { axiosInstance } from "@utils/axios";
import { fixProjectUrl } from "@utils/helperFunctions";
import { createStore, localPersistStorage } from "@utils/storeUtils";
import {
  createRandomWalletWithPhone,
  getWalletUsingMnemonic,
} from "@utils/web3";
import { DEFAULT_PASSCODE } from "../config";
import { HDNodeWallet, Wallet } from "ethers";
import { mockBeneficiaries } from "@utils/mockData";
import countriesData from "../constants/countries.json";

const useAppStore = createStore<AppStoreType>(
  (set, get) => ({
    isAuthenticated: false,
    isInitialized: false,
    wallet: undefined,
    currentUser: undefined,
    projectSettings: undefined,
    chainData: undefined,
    mockData: [],
    initialize: async () => {
      const { currentUser, wallet, projectSettings, setCountries, countries } =
        get();

      setCountries(countriesData);

      if (projectSettings?.baseUrl)
        axiosInstance.defaults.baseURL = fixProjectUrl(projectSettings.baseUrl);

      set({
        isInitialized: true,
        isAuthenticated: !!currentUser,
        //   &&
        // !!wallet,
        mockData: mockBeneficiaries,
      });
    },

    handleRegister: async (data: IAddVendorPayload) => {
      if (!data?.phone || !data?.name) return;
      //  create random wallet with phone number
      const walletValue = createRandomWalletWithPhone(data?.phone);

      //  save vendor in backend db
      const vendorPayload = {
        ...data,
        walletAddress: walletValue?.address,
      };

      //  save wallet info in localstorage by encrypting with passcode in .env file
      const encryptedWallet = await walletValue.encrypt(DEFAULT_PASSCODE);

      set({
        currentUser: vendorPayload,
        wallet: walletValue,
      });

      return walletValue;
    },

    handleRestore: async (mnemonics: string) => {
      if (!mnemonics) throw new Error("Mnemonics is empty");
      const wallet = getWalletUsingMnemonic(mnemonics);

      //  save wallet info in localstorage by encrypting with passcode in .env file
      const encryptedWallet = await wallet.encrypt(DEFAULT_PASSCODE);
      set({
        wallet,
      });
      return { wallet };
    },

    setChainData: async (chainData: StorageChainData) => {
      set({ chainData });
    },

    setWallet: async (wallet: any) => {
      set({ wallet });
    },

    setCurrentUser: async (currentUser: StorageCurrentUser) => {
      set({ currentUser });
    },

    setProjectSettings: async (data: StorageProjectSettings) => {
      set((state) => ({
        projectSettings: { ...state.projectSettings, ...data },
      }));
      if (data?.baseUrl)
        axiosInstance.defaults.baseURL = fixProjectUrl(data.baseUrl);
    },

    logout: async () => {
      set({
        isAuthenticated: false,
        isInitialized: true,
        wallet: undefined,
        currentUser: undefined,
        projectSettings: undefined,
        chainData: undefined,
      });
    },

    setMockData: (data: any) => {
      set({ mockData: data });
    },
    setCountries: (countries) => {
      set({ countries });
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "AppStore",
      storage: localPersistStorage,
      partialize: (state) => ({
        chainData: state.chainData,
        wallet: state.wallet,
        currentUser: state.currentUser,
        projectSettings: state.projectSettings,
        data: { countries: state.countries },
      }),
    },
  }
);

export default useAppStore;
