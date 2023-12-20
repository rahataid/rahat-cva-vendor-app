import useAppStore from "@store/app";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import VendorsService from "../services/vendors";

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
  const { data, isLoading, error } = useQuery(
    ["vendors", walletAddress],
    async () => {
      const res = await VendorsService.details(walletAddress);
      return res;
    }
  );

  const vendor = useMemo(() => data?.data || ({} as any), [data?.data]);

  return {
    vendor,
    isLoading,
    error,
  };
}

export function useVendorChainData(walletAddress: string): any {
  const { setChainData, chainData, projectSettings } = useAppStore.getState();
  console.log("USE VENDOR CHAIN DATA");
  const { data, isLoading, error } = useQuery(
    ["vendors", , walletAddress, chainData],
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
