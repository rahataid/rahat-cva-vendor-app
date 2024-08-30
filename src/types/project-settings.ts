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
  networkId: number;
  rpcurl: string;
  blockExplorerUrls?: string;
  iconUrls?: string[];
  chainWebSocket?: string;
};
export type IProjectSettingsNetwork = IProjectSettingsNetworkApiResponse;
