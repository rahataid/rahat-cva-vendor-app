import { IAddVendorPayload } from "@types/vendors";
import { axiosInstance } from "@utils/axios";
import { fixProjectUrl } from "@utils/helperFunctions";
import { createStore, localPersistStorage } from "@utils/storeUtils";
import {
  createRandomWalletWithPhone,
  getWalletUsingMnemonic,
  signMessage,
} from "@utils/web3";
import { DEFAULT_PASSCODE, GRAPHQL_URL } from "../config";
import { mockBeneficiaries } from "@utils/mockData";
import countriesData from "../constants/countries.json";
import {
  AppStoreType,
  StorageCurrentUser,
  StorageProjectSettings,
} from "@types/store/app";
import { CurrencyDescription } from "@types/transactions";
import AuthService from "@services/auth";

const useAppStore = createStore<AppStoreType>(
  (set, get) => ({
    isAuthenticated: false,
    isInitialized: false,
    wallet: undefined,
    currentUser: undefined,
    projectSettings: undefined,
    chainData: undefined,
    mockData: [],
    countries: [],
    currencyDescription: undefined,

    initialize: async () => {
      const {
        currentUser,
        wallet,
        projectSettings,
        setCountries,
        countries,
        setProjectSettings,
      } = get();

      setCountries(countriesData);

      if (projectSettings?.baseUrl)
        axiosInstance.defaults.baseURL = fixProjectUrl(projectSettings.baseUrl);
      if (currentUser?.accessToken)
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${currentUser?.accessToken}`;

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

    setWallet: async (wallet: any) => {
      set({ wallet });
    },

    setCurrentUser: async (data: StorageCurrentUser) => {
      set((state) => ({
        currentUser: { ...state.currentUser, ...data },
      }));
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

    setCurrencyDescription: (currencyDescription: CurrencyDescription) => {
      set({ currencyDescription });
    },

    getAccessToken: async (projectUrl) => {
      const { wallet } = get();
      const challengeRes = await AuthService.getChallenge(projectUrl);
      const challenge = challengeRes?.data?.data?.challenge;
      const walletInstance = getWalletUsingMnemonic(wallet?.mnemonic?.phrase);
      const signature = await signMessage({
        wallet: walletInstance,
        message: challenge,
      });
      const accessTokenRes = await AuthService.getAuthToken(projectUrl, {
        challenge,
        signature,
      });
      return accessTokenRes?.data?.data?.accessToken;
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "AppStore",
      storage: localPersistStorage,
      partialize: (state) => ({
        wallet: state.wallet,
        currentUser: state.currentUser,
        projectSettings: state.projectSettings,
        data: { countries: state.countries },
        currencyDescription: state.currencyDescription,
      }),
    },
  }
);

export default useAppStore;
