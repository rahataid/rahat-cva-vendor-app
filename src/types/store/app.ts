import {
  IProjectSettingsContractsApiResponse,
  IProjectSettingsNetwork,
} from "@types/project-settings";
import { IAddVendorPayload } from "@types/vendors";
import { HDNodeWallet, Wallet } from "ethers";

export type StorageChainData = {
  allowance: number;
  disbursed: number;
  distributed: number;
  isVendorApproved: boolean;
};

export type StorageCurrentUser = {
  name: string;
  phone: string;
  address?: any;
  walletAddress: string;
};

export type StorageProjectSettings = {
  baseUrl?: string;
  network?: IProjectSettingsNetwork;
  contracts?: IProjectSettingsContractsApiResponse;
  projectId?: string;
} | null;

export type AppStateType = {
  chainData: StorageChainData | undefined;
  wallet: Wallet | HDNodeWallet | undefined;
  currentUser: StorageCurrentUser | undefined;
  projectSettings: StorageProjectSettings | undefined;
  isAuthenticated: boolean;
  isInitialized: boolean;
  mockData: any[];
  countries: Array<any>;
};

export type AppActionsType = {
  initialize: () => Promise<void>;
  handleRegister: (
    data: IAddVendorPayload
  ) => Promise<Wallet | HDNodeWallet | any>;
  handleRestore: (data: string) => void;
  setChainData: (data: StorageChainData) => Promise<void>;
  setCurrentUser: (data: StorageCurrentUser) => void;
  setWallet: (data: any) => void;
  setProjectSettings: (data: StorageProjectSettings) => Promise<void>;
  logout: () => void;
  setMockData: (data: any) => void;
  setCountries: (countries: Array<any>) => void;
};

export type AppStoreType = AppStateType & AppActionsType;
