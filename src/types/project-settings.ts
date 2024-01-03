import { InterfaceAbi } from "ethers";

export type IProjectSettingsContractsApiResponse = {
  [key: string]: {
    address: string;
    abi: InterfaceAbi;
  };
};

export type IProjectSettingsNetworkApiResponse = {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18 | number;
  };
  rpcUrl: string;
  blockExplorerUrls?: string;
  iconUrls?: string[];
  chainWebSocket?: string;
  networkId: number;
};
export type IProjectSettingsNetwork = IProjectSettingsNetworkApiResponse;
