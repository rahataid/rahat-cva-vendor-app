import useAppStore from "@store/app";
import { CONTRACTS } from "../../config";

export const useProject = () => {
  const { contractsFn, contracts } = useAppStore((state) => ({
    contractsFn: state.contractsFn,
    contracts: state.contracts,
  }));

  const contract = contractsFn?.[CONTRACTS.CVAPROJECT];
  const communityContract = contractsFn?.[CONTRACTS.COMMUNITY];
  const RahatToken = contractsFn?.[CONTRACTS.RAHATTOKEN];
  const RahatClaim = contractsFn?.[CONTRACTS.CLAIM];

  console.log("USE PROJECT CVAPROJECT", contracts[CONTRACTS.CVAPROJECT]);

  const getProjectBalance = async () => {
    let balance = await RahatToken?.balanceOf(contracts[CONTRACTS.CVAPROJECT]);
    return balance?.toString();
  };

  const checkIsVendorApproved = async (vendorAddress: string) => {
    console.log("VENDOR ADDRESS====", vendorAddress);
    const vendorRole = await communityContract?.VENDOR_ROLE();
    // return communityContract?.hasRole(vendorRole, vendorAddress);
    const casess = await communityContract?.hasRole(vendorRole, vendorAddress);
    return casess;
  };

  const checkIsProjectLocked = () => contract?.isLocked();

  const getPendingTokensToAccept = async (vendorAddress: string) => {
    let res = await contract?.vendorAllowancePending(vendorAddress);
    console.log(res, "get pending tokens to accept+++++");
    return res;
  };

  const getDisbursed = async (walletAddress: string) =>
    (await RahatToken?.balanceOf(walletAddress))?.toString();

  const getVendorAllowance = async (vendorAddress: string) =>
    (await contract?.vendorAllowance(vendorAddress))?.toString();

  const acceptTokensByVendor = async (numberOfTokens: number) =>
    await contract?.acceptAllowanceByVendor(numberOfTokens.toString());

  return {
    getProjectBalance,
    checkIsVendorApproved,
    checkIsProjectLocked,
    getPendingTokensToAccept,
    getDisbursed,
    getVendorAllowance,
    acceptTokensByVendor,
  };
};
