import useAppStore from "@store/app";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import VendorsService from "../services/vendors";
import { saveCurrentUser } from "@utils/sessionManager";

export function useVendors(params?: any): any {
  const { data, isLoading, error } = useQuery(["vendors"], async () => {
    const res = await VendorsService.list(params);
    return res;
  });

  const vendors = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    vendors,
    loading: isLoading,
    error,
    meta,
  };
}

export function useVendor(walletAddress: string): any {
  const {
    saveCurrentUser: saveCurrentUserInfo,
    projectSettings,
    currentUser,
  } = useAppStore.getState();
  if (currentUser)
    return { vendor: currentUser, isLoading: false, error: null };
  const queryEnabled =
    projectSettings?.internetAccess &&
    !!projectSettings?.baseUrl &&
    !currentUser;

  const { data, isLoading, error } = useQuery(
    ["vendorDetails", walletAddress],
    async () => {
      const res = await VendorsService.details(walletAddress);
      return res;
    },
    {
      enabled: queryEnabled,
      staleTime: 60000,
      onSuccess: (data: any) => {
        const payload = {
          name: data?.data?.name,
          phone: data?.data?.phone,
          walletAddress: data?.data?.walletAddress,
        };
        saveCurrentUser(payload);
        saveCurrentUserInfo(payload);
      },
    }
  );

  // const vendor = useMemo(() => currentUser, [data?.data]);
  const vendor = currentUser;

  return {
    vendor,
    isLoading,
    error,
  };
}

export function useVendorChainData(walletAddress: string): any {
  const { setChainData, chainData, projectSettings, transactions } =
    useAppStore.getState();
  console.log("USE VENDOR CHAIN DATA");
  const { data, isLoading, error } = useQuery(
    ["vendors", , walletAddress, chainData, transactions],
    async () => {
      console.log("EXECUTE VENDOR CHAIN");
      const res = await VendorsService.getChainData(walletAddress);
      return res;
    },
    {
      enabled: projectSettings?.internetAccess && !!projectSettings?.baseUrl,
      onSuccess: (data) => {
        setChainData(data?.data);
      },
    }
  );

  const dataChain = useMemo(() => chainData, [data?.data]);

  return {
    chainData: dataChain,
    isLoading,
    error,
  };
}
