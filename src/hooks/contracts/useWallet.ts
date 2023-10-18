import useAppStore from "../../store/app";

export const useWallet = (privateKey?: string) => {
  let { network, wallet } = useAppStore((state) => ({
    network: state.blockchain,
    wallet: state.wallet,
  }));
  if (privateKey) return wallet;
  //   if (privateKey) wallet = new ethers.Wallet(privateKey);

  return wallet;
  //   return wallet?.connect(new JsonRpcProvider(network.rpcUrl));
};
