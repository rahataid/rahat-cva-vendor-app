import {
  BaseContract,
  Contract,
  HDNodeWallet,
  JsonRpcProvider,
  Mnemonic,
  Provider,
  Wallet,
  ethers,
  getAddress,
  isAddress,
} from "ethers";
import { DEFAULT_PASSCODE, RAHAT_ADMIN_PRIVATE_KEY } from "../config";
import { types } from "./eip712Types";

type BuiltRequest = {
  from: any;
  to: any;
  value: bigint;
  data: any;
  gas: bigint;
  deadline: number;
  nonce: any;
  signature?: string;
};

export function saveWalletInfo(wallet: Wallet): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("wallet", JSON.stringify(wallet));
  }
}

export function getWalletFromJson(
  encryptedWallet: any,
  passcode: string
): Promise<Wallet | HDNodeWallet> | null {
  if (!encryptedWallet) return null;
  return ethers.Wallet.fromEncryptedJson(encryptedWallet, passcode);
}

export async function getEthBalance(
  address: string
): Promise<string | undefined> {
  return (await ethers.getDefaultProvider().getBalance(address))?.toString();
}

export function getWallet(): Promise<Wallet | HDNodeWallet> | null {
  const data =
    typeof window !== "undefined" ? localStorage.getItem("wallet") : "";
  return getWalletFromJson(data, DEFAULT_PASSCODE);
}

export function createRandomWallet(provider: Provider): HDNodeWallet {
  return ethers.Wallet.createRandom(provider);
}

export function createRandomWalletWithPhone(data: any) {
  return ethers.Wallet.createRandom(data);
}

export function getWalletUsingMnemonic(mnemonic: string): HDNodeWallet {
  const mnemonicWallet = Mnemonic.fromPhrase(mnemonic);
  const wall = HDNodeWallet.fromMnemonic(mnemonicWallet);
  return wall;
}

function getRandomString(length: number): string {
  let randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function getRandomEntropy(): Buffer {
  const randomChars = getRandomString(128);
  return Buffer.from(randomChars, "utf-8");
}

export function validateWalletAddress(address: string): boolean {
  try {
    const addressInstance = getAddress(address);
    return isAddress(addressInstance);
  } catch (error) {
    return false;
  }
}

export const signMessage = async ({ wallet, message }: any) => {
  try {
    const signature = await wallet.signMessage(JSON.stringify(message));
    return signature;
  } catch (error: any) {
    console.error("Error signing message:", error.message);
    throw error.message;
  }
};

export async function createContractInstance(rpcUrl: string, contract: any) {
  //  Create Provider
  const provider = new JsonRpcProvider(rpcUrl);

  //  Create an instance of the contract
  return new Contract(contract.address, contract.abi, provider);
}

export async function createContractInstanceUsingWallet(
  rpcUrl: string,
  contract: any
) {
  //  Create wallet from private key
  const provider = new JsonRpcProvider(rpcUrl);

  const wallet = new ethers.Wallet(RAHAT_ADMIN_PRIVATE_KEY, provider);

  //  Create an instance of the contract
  return new Contract(contract.address, contract.abi, wallet);
}

export async function createContractInstanceFromWallet(
  rpcUrl: string,
  contract: any,
  privateKey: string
) {
  const provider = new JsonRpcProvider(rpcUrl);

  const wallet = new ethers.Wallet(privateKey, provider);
  return new Contract(contract.address, contract.abi, wallet);
}

export async function createBaseContract(rpcUrl: string, contract: any) {
  const c = new BaseContract(contract.address, contract.abi);
  return c;
}

export async function createWalletFromPrivateKey(
  rpcUrl: string,
  privateKey: string
) {
  //  Create wallet from private key
  const provider = new JsonRpcProvider(rpcUrl);

  return new ethers.Wallet(privateKey, provider);
}

export async function getDomain(contract: any) {
  const {
    fields,
    name,
    version,
    chainId,
    verifyingContract,
    salt,
    extensions,
  } = await contract.eip712Domain();

  if (extensions.length > 0) {
    throw Error("Extensions not implemented");
  }

  const domain: any = {
    name,
    version,
    chainId,
    verifyingContract,
    salt,
  };

  for (const [i, { name }] of types.EIP712Domain.entries()) {
    if (!(fields & (1 << i))) {
      delete domain[name];
    }
  }

  return domain;
}

export async function buildRequest(
  forwarderContract: any,
  input: any
): Promise<BuiltRequest> {
  const nonce = await forwarderContract.nonces(input.from);
  return {
    from: input.from,
    to: input.to,
    value: BigInt(0),
    data: input.data,
    gas: BigInt(1e6),
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    nonce,
  };
}

export async function buildTypedData(forwarderContract: any) {
  const domain = await getDomain(forwarderContract);
  const ForwardRequest = types.ForwardRequest;
  return {
    domain,
    types: { ForwardRequest },
  };
}

export async function signMetaTxRequest(
  signer: HDNodeWallet,
  forwarderContract: any,
  input: any
) {
  const request = await buildRequest(forwarderContract, input);
  const { domain, types } = await buildTypedData(forwarderContract);
  const signature = await signer.signTypedData(domain, types, request);
  request.signature = signature;
  return request;
}

export async function getMetaTxRequest(
  signer: HDNodeWallet,
  forwarderContract: any,
  CVAContractInstance: any,
  functionName: string,
  params: any[] | [] | null
) {
  return signMetaTxRequest(signer, forwarderContract, {
    from: signer.address,
    to: CVAContractInstance.target,
    data: CVAContractInstance.interface.encodeFunctionData(
      functionName,
      params
    ),
  });
}
