import { ContractTransactionResponse } from "ethers";
import { useCallback, useMemo } from "react";
import useContract from "../../hooks/contracts/useContract";
import { useErrorHandler } from "../../hooks/use-error-handler";
import { CONTRACTS } from "../../types/enums";
import { IVendorChainData, ProjectContract } from "../../types/useProject";

const useProjectContract = (): ProjectContract => {
  const { handleContractError } = useErrorHandler();
  const [projectContract, abi] = useContract(CONTRACTS.CVAPROJECT);
  const [projectContractWS] = useContract(CONTRACTS.CVAPROJECT, {
    isWebsocket: true,
  });
  const [tokenContract] = useContract(CONTRACTS.RAHATTOKEN);
  const [donorContract] = useContract(CONTRACTS.DONOR);
  const [communityContract] = useContract(CONTRACTS.COMMUNITY);

  const acceptToken = useCallback(
    async (amount: string): Promise<ContractTransactionResponse | void> => {
      if (!projectContract || !donorContract) {
        return;
      }
      await projectContract
        .acceptToken(donorContract.target, amount)
        .catch(handleContractError);
    },
    [projectContract, donorContract, handleContractError]
  );

  const getVendorBalance = useCallback(
    async (walletAddress: string): Promise<number | undefined> => {
      if (!tokenContract) {
        return undefined;
      }
      const balance = await tokenContract.balanceOf(walletAddress);
      return balance?.toString();
    },
    [tokenContract]
  );

  const getVendorAllowance = useCallback(
    async (vendorAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const allowance = await projectContract.vendorAllowance(vendorAddress);
      return allowance?.toString();
    },
    [projectContract]
  );

  const checkActiveVendor = useCallback(
    async (address: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      const role = await communityContract.VENDOR_ROLE();
      return communityContract
        .hasRole(role, address)
        .catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const pendingVendorAllowance = useCallback(
    async (vendorAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const pending = await projectContract.vendorAllowancePending(
        vendorAddress
      );
      return pending?.toString();
    },
    [projectContract]
  );

  const acceptTokensByVendors = useCallback(
    async (numberOfTokens: string): Promise<void> => {
      if (!projectContract) {
        return;
      }
      await projectContract
        .acceptAllowanceByVendor(numberOfTokens.toString())
        .catch(handleContractError);
    },
    [projectContract, handleContractError]
  );

  const checkActiveBeneficiary = useCallback(
    async (address: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      return communityContract
        .isBeneficiary(address)
        .catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const beneficiaryCounts = useCallback(async (): Promise<
    number | undefined
  > => {
    if (!projectContract) {
      return undefined;
    }
    return projectContract.beneficiaryCount();
  }, [projectContract]);

  const getVendorChainData = useCallback(
    async (address: string): Promise<IVendorChainData> => {
      const [balance, allowance, isVendor, pending] = await Promise.all([
        getVendorBalance(address),
        getVendorAllowance(address),
        checkActiveVendor(address),
        pendingVendorAllowance(address),
      ]);
      return {
        balance: allowance || 0,
        isVendor: isVendor || null,
        pending: pending || 0,
        disbursed: balance || 0,
      };
    },
    [
      checkActiveVendor,
      getVendorAllowance,
      getVendorBalance,
      pendingVendorAllowance,
    ]
  );

  return useMemo(
    () => ({
      projectContract,
      projectContractWS,
      abi,
      communityContract,
      acceptToken,
      getVendorBalance,
      getVendorAllowance,
      checkActiveVendor,
      pendingVendorAllowance,
      acceptTokensByVendors,
      checkActiveBeneficiary,
      beneficiaryCounts,
      getVendorChainData,
    }),
    [
      projectContract,
      projectContractWS,
      abi,
      communityContract,
      acceptToken,
      getVendorBalance,
      getVendorAllowance,
      checkActiveVendor,
      pendingVendorAllowance,
      acceptTokensByVendors,
      checkActiveBeneficiary,
      beneficiaryCounts,
      getVendorChainData,
    ]
  );
};

export default useProjectContract;
