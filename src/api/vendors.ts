import useAppStore from "@store/app";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import VendorsService from "../services/vendors";
import { saveCurrentUser } from "@utils/sessionManager";
import useTransactionStore from "@store/transaction";
import { VOUCHER } from "../types/beneficiaries";
import {
  IAllTransactions,
  IBeneficiaryReferreds,
  TransactionDetail,
} from "@types/transactions";

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

export function useVendorVoucher(queryService: any): any {
  const {
    currentUser,
    wallet: { address: walletAddress },
  } = useAppStore.getState();
  const { data, isLoading, error, refetch, isFetching } = useQuery(
    ["vendorVouchers", walletAddress],
    async () => {
      console.log("EXECUTE USE VOUCHER");
      const res = await queryService.useVendorVoucher(walletAddress);
      console.log("RES USE VOUCHER");
      return res;
    },
    {
      enabled: currentUser?.projects?.length > 0,
      staleTime: 60000,
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  };
}

export function useVendorTransaction(queryService: any) {
  const {
    currentUser,
    wallet: { address: walletAddress },
  } = useAppStore.getState();

  const { data, isLoading, error, refetch, isFetching } = useQuery(
    ["vendorTransactions", walletAddress],
    async () => {
      const data = await queryService.useVendorTransaction(walletAddress);
      if (!data?.data) return [];

      const {
        beneficiaryReferreds,
        projectClaimProcesseds,
        claimCreateds,
        tokenRedeems,
      } = data.data;

      const fixedBeneficiaryReferreds = beneficiaryReferreds.map(
        (el: IBeneficiaryReferreds) => ({
          ...el,
          beneficiary: el.beneficiaryAddress,
        })
      );

      const allData: IAllTransactions = [
        ...fixedBeneficiaryReferreds,
        ...projectClaimProcesseds,
        ...claimCreateds,
        ...tokenRedeems,
      ];

      return allData;
    },
    {
      enabled: currentUser?.projects?.length > 0,
      staleTime: 60000,
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  };
}

export function useVendorTransactionDetails(transactionHash: string) {
  const {
    wallet: { address: walletAddress },
  } = useAppStore.getState();

  const queryClient = useQueryClient();
  const cachedDataTransactions = queryClient.getQueryData([
    "vendorTransactions",
    walletAddress,
  ]);
  const details = cachedDataTransactions?.find(
    (el: TransactionDetail) => el.transactionHash === transactionHash
  );
  return {
    data: details || {},
  };
}

export function useVendorDetails({ forceRender }: any): any {
  const {
    currentUser,
    setCurrentUser,
    setProjectSettings,
    projectSettings: { projectId },
  } = useAppStore.getState();

  const { data, isLoading, error } = useQuery(
    ["vendorDetails", forceRender],
    async () => {
      const res = await VendorsService.getDetails(currentUser?.uuid);
      return res;
    },
    {
      enabled: !currentUser?.projects?.length || !projectId,
      staleTime: 0,
      onSuccess: (data: any) => {
        console.log("VENDOR GET DETAILS RESPONSE", data?.data?.data);
        if (data?.data?.data) {
          setCurrentUser(data?.data?.data);
          setProjectSettings({
            projectId: data?.data?.data?.projects[0]?.uuid,
          });
        }

        // const payload = {
        //   ...currentUser,
        // };
        // setCurrentUser(payload);
      },
    }
  );

  const vendor = useMemo(() => currentUser, [data?.data?.data]);

  return {
    data: vendor,
    isLoading,
    error,
  };
}

export function useVendorVoucherRedemptionCount(voucherType: VOUCHER) {
  const { getVendorVoucherRedemptionCount } = useTransactionStore();
  const { data, isLoading, error, isRefetching } = useQuery(
    ["vendorVoucherRedemptionCount"],
    async () => {
      const res = await getVendorVoucherRedemptionCount(voucherType);
      return res ? Number(res) : 0;
    },
    {
      staleTime: 0,
    }
  );

  return {
    data,
    isLoading,
    error,
    isRefetching,
  };
}

export function useVendorVoucherRedemptionList() {
  const { getVendorRedemptionList } = useTransactionStore();
  const { data, isLoading, error, refetch, isFetching } = useQuery(
    ["vendorVoucherRedemptionList"],
    async () => {
      const res = await getVendorRedemptionList();
      return res?.data?.data || [];
    },
    {
      staleTime: 0,
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  };
}
