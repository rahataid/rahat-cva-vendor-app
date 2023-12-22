import {
  HDNodeWallet,
  JsonRpcProvider,
  Mnemonic,
  Provider,
  Wallet,
  ethers,
  getAddress,
  isAddress,
} from "ethers";
import { DEFAULT_PASSCODE } from "../config";

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
