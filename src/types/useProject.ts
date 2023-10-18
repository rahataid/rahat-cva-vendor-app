import { Contract, InterfaceAbi } from "ethers";

export type IVendorChainData = {
  isVendor: boolean | null;
  balance: number;
  pending: number;
  disbursed: number;
};

export interface ProjectContract {
  projectContract: Contract | null;
  projectContractWS: Contract | null;
  abi: InterfaceAbi | null;
  communityContract: Contract | null;
  getVendorBalance: (walletAddress: string) => Promise<number | undefined>;
  getVendorAllowance: (vendorAddress: string) => Promise<number | undefined>;
  checkActiveVendor: (address: string) => Promise<boolean>;
  pendingVendorAllowance: (
    vendorAddress: string
  ) => Promise<number | undefined>;
  acceptTokensByVendors: (numberOfTokens: string) => Promise<void>;
  checkActiveBeneficiary: (address: string) => Promise<boolean>;

  beneficiaryCounts: () => Promise<number | undefined>;
  getVendorChainData: (address: string) => Promise<IVendorChainData>;
}
