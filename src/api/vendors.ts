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
