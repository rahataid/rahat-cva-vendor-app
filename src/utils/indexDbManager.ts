import { Preferences } from "@capacitor/preferences";

export const setObject = async (key: string, value: string) => {
  await Preferences.set({
    key,
    value: JSON.stringify(value),
  });
};

export const getObject = async (key: string) => {
  const ret = await Preferences.get({ key });
  if (ret?.value) return JSON.parse(ret.value);
  return undefined;
};

export const saveCurrentUserInfo = async (userData: any) => {
  await setObject("currentUser", userData);
};

export const saveWalletInfo = async (walletData: any) => {
  await setObject("wallet", walletData);
};

export const getCurrentWalletInfo = () => {
  return getObject("wallet");
};

export const getCurrentUserInfo = () => {
  return getObject("currentUser");
};
