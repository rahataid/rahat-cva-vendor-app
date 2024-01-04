import { DEFAULT_PASSCODE } from "../config";
import { getWalletFromJson } from "./web3";

export const saveKey = (key: string, value: any) =>
  typeof window !== "undefined"
    ? localStorage.setItem(
        key,
        typeof value === "bigint"
          ? JSON.stringify(value.toString())
          : JSON.stringify(value)
      )
    : "";
export const getKey = (key: string) =>
  typeof window !== "undefined" ? JSON.parse(localStorage.getItem(key)) : "";

export const getCurrentUser = () => {
  let user = null;
  const data =
    typeof window !== "undefined" ? localStorage.getItem("currentUser") : "";
  if (data) user = JSON.parse(data);
  return user;
};

export const saveCurrentUser = (userData: any) =>
  typeof window !== "undefined"
    ? localStorage.setItem("currentUser", JSON.stringify(userData))
    : "";

export const saveWalletInfo = (wallet: any) =>
  typeof window !== "undefined" ? localStorage.setItem("wallet", wallet) : "";

export const getWallet = () => {
  const data =
    typeof window !== "undefined" ? localStorage.getItem("wallet") : "";
  return getWalletFromJson(data, DEFAULT_PASSCODE);
};

export const saveProjectSettings = (value: any) =>
  typeof window !== "undefined"
    ? localStorage.setItem("projectSettings", JSON.stringify(value))
    : "";

export const getProjectSettings = (key: string) => {
  const data =
    typeof window !== "undefined"
      ? localStorage.getItem("projectSettings")
      : "";
  if (key && data) {
    const projectSettings = JSON.parse(data as string);
    return projectSettings[key] || "";
  }
  return data;
};

export const logOut = () => {
  localStorage.removeItem("wallet");
  localStorage.removeItem("currentUser");
  localStorage.clear();
};
