import { GENDER, PROJECT_DETAILS } from "@types/beneficiaries";
import {
  IProjectSettingsContractsApiResponse,
  IProjectSettingsNetwork,
} from "@types/project-settings";
import { IAddVendorPayload } from "@types/vendors";
import { HDNodeWallet, Wallet } from "ethers";

export type StorageCurrentUser = {
  name?: string;
  phone?: string;
  address?: any;
  walletAddress?: string;
  createdAt?: string;
  createdBy?: string;
  deletedAt?: string;
  email?: string;
  extras?: any;
  gender?: GENDER;
  id?: number;
  projects?: PROJECT_DETAILS[];
  updatedAt?: string;
  updatedBy?: null;
  uuid?: string;
  wallet?: string;
  isApproved?: boolean;
};

export type StorageProjectSettings = {
  admin: { url: "string" };
  baseUrl?: string;
  contracts?: IProjectSettingsContractsApiResponse;
  network?: IProjectSettingsNetwork;
  projectId?: string;
  subGraph: { url: "string" };
} | null;

export type AppStateType = {
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
  setCurrentUser: (data: StorageCurrentUser) => void;
  setWallet: (data: any) => void;
  setProjectSettings: (data: StorageProjectSettings) => Promise<void>;
  logout: () => void;
  setMockData: (data: any) => void;
  setCountries: (countries: Array<any>) => void;
};

export type AppStoreType = AppStateType & AppActionsType;
