import { HDNodeWallet, Mnemonic, Provider, Wallet, ethers } from "ethers";
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
