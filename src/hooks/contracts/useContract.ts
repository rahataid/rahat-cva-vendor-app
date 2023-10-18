import { Contract, InterfaceAbi, WebSocketProvider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import useAppStore from "../../store/app";
import { useWallet } from "./useWallet";

interface UseContractOptions {
  isWebsocket?: boolean;
  contractAddress?: string;
}

type UseContractReturn = [Contract | null, InterfaceAbi | null];

type UseContract = (
  contractName: string,
  options?: UseContractOptions
) => UseContractReturn;

const useContract: UseContract = (contractName, options = {}) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const { contracts, networks } = useAppStore((state) => ({
    contracts: state.contracts,
    networks: state.blockchain,
  }));
  const wallet = useWallet();

  const contractInstance = useMemo(() => {
    if (contracts && contractName) {
      if (options?.isWebsocket)
        return new Contract(
          (options?.contractAddress ||
            contracts[contractName].address) as string,
          contracts[contractName].abi,
          new WebSocketProvider(networks?.chainWebSocket as string)
        );
      return new Contract(
        options?.contractAddress || contracts[contractName].address,
        contracts[contractName].abi,
        wallet
      );
    }
    return null;
  }, [contracts, contractName, options?.contractAddress, wallet]);

  useEffect(() => {
    setContract(contractInstance);
  }, [contractInstance]);

  return [contract, contracts?.[contractName]?.abi || null];
};

export default useContract;
