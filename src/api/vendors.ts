import useAppStore from "@store/app";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import VendorsService from "../services/vendors";
import { saveCurrentUser } from "@utils/sessionManager";
import useTransactionStore from "@store/transaction";

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
  const queryEnabled = !!projectSettings?.baseUrl && !currentUser;

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

export function useVendorChainData(
  walletAddress: string,
  forceRender: boolean
): any {
  const { setChainData, chainData, projectSettings } = useAppStore.getState();
  const { transactions } = useTransactionStore();
  const { data, isLoading, error } = useQuery(
    ["vendors", walletAddress, chainData, transactions, forceRender],
    async () => {
      const res = await VendorsService.getChainData(walletAddress);
      return res;
    },
    {
      enabled: !!projectSettings?.baseUrl,
      staleTime: 60000,
      cacheTime: 0,
      onSuccess: (data) => {
        setChainData(data?.data);
      },
    }
  );
  const loading = isLoading && !!projectSettings?.baseUrl;

  const dataChain = useMemo(() => chainData, [data?.data]);

  return {
    chainData: dataChain,
    isLoading: loading,
    error,
  };
}

export function useVendorVoucher(
  walletAddress: string,
  queryService: any
): any {
  const { data, isLoading, error } = useQuery(
    ["vendorVouchers", walletAddress],
    async () => {
      const res = await queryService.useVendorVoucher(walletAddress);
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  return {
    data,
    isLoading,
    error,
  };
}

export function useVendorTransaction(walletAddress: string, queryService: any) {
  const { data, isLoading, error } = useQuery(
    ["vendorTransactions", walletAddress],
    async () => {
      const res = await queryService.useVendorTransaction(walletAddress);
      return res;
    },
    {
      staleTime: 60000,
    }
  );

  const transactionsData = useMemo(() => {
    if (!data?.data) return [];
    const {
      beneficiaryReferreds,
      projectClaimProcesseds,
      claimCreateds,
      tokenRedeems,
    } = data.data;
    return [
      ...beneficiaryReferreds,
      ...projectClaimProcesseds,
      ...claimCreateds,
      ...tokenRedeems,
    ];
  }, [data]);

  return {
    data: transactionsData,
    isLoading,
    error,
  };
}
