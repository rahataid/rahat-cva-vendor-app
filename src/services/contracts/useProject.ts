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

  const getBeneficiaryBalance = async (walletAddress: string) => {
    let balance = await contract
      ?.beneficiaryClaims(walletAddress)
      .catch(
        (error: { error: { error: { error: { toString: () => any } } } }) => {
          try {
            let message = error.error.error.error.toString();
            message = message.replace(
              "Error: VM Exception while processing transaction: revert ",
              ""
            );
            console.log(message);
          } catch (e) {
            console.log(
              "Error occured calling contract. Please check logs for details."
            );
            console.error(error);
          }
        }
      );
    balance = balance?.toString();
    return balance;
  };

  const requestTokenFromBeneficiary = async (to: string, amount: string) => {
    try {
      const transaction = await contract[
        "requestTokenFromBeneficiary(address,uint256)"
      ](
        to,
        amount?.toString()
        // TODO: change this to the actual address
        // '0xc0ECad507A3adC91076Df1D482e3D2423F9a9EF9'
      );
      console.log({ transaction });
      const receipt = await transaction.wait();
      console.log({ receipt });
      const event = receipt.logs[0];
      console.log({ event });
      const decodedEventArgs = RahatClaim?.interface.decodeEventLog(
        "ClaimCreated",
        event.data,
        event.topics
      );
      console.log({ decodedEventArgs });
      return decodedEventArgs?.claimId?.toString();
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };

  const processTokenRequest = (beneficiary: string, otp: string) =>
    contract?.processTokenRequest(beneficiary, otp).catch((error: any) => {
      try {
        let message = error.error.error.error.toString();
        message = message.replace(
          "Error: VM Exception while processing transaction: revert ",
          ""
        );
        console.log({ message });
        throw message;
      } catch (e) {
        console.error(error);
        throw error;
      }
    });

  return {
    getProjectBalance,
    checkIsVendorApproved,
    checkIsProjectLocked,
    getPendingTokensToAccept,
    getDisbursed,
    getVendorAllowance,
    acceptTokensByVendor,
    getBeneficiaryBalance,
    requestTokenFromBeneficiary,
    processTokenRequest,
  };
};
