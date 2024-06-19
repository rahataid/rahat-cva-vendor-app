import useAppStore from "@store/app";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import VendorsService from "../services/vendors";
import { saveCurrentUser } from "@utils/sessionManager";
import useTransactionStore from "@store/transaction";
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
      enabled: currentUser?.projects?.length > 0 && currentUser?.isApproved,
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

export function useIsVendorApproved({ forceRender }: { forceRender: boolean }) {
  const { checkIsVendorApproved } = useTransactionStore();
  const { setCurrentUser, walletAddress, currentUser, projectId, elProject } =
    useAppStore((s) => {
      return {
        currentUser: s?.currentUser,
        walletAddress: s?.wallet?.address,
        setCurrentUser: s?.setCurrentUser,
        projectId: s?.projectSettings?.projectId,
        elProject: s?.projectSettings?.contracts?.elproject,
      };
    });
  const { data, isLoading, error, refetch, isFetching } = useQuery(
    ["isVendorApproved", walletAddress, forceRender],
    async () => {
      const isApproved = await checkIsVendorApproved();
      setCurrentUser({ isApproved });
      return isApproved;
    },
    {
      enabled:
        !!elProject &&
        !!currentUser?.projects?.length &&
        !!projectId &&
        !currentUser?.isApproved,
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

export function useVendorStats() {
  const { getBeneficiaryClaims, getClaimCount } = useTransactionStore();
  const { walletAddress, currentUser, projectId } = useAppStore((s) => {
    return {
      walletAddress: s?.wallet?.address,
      currentUser: s?.currentUser,
      projectId: s?.projectSettings?.projectId,
    };
  });

  const { data, isLoading, error, refetch, isFetching } = useQuery(
    ["vendorStats", walletAddress],
    async () => {
      const balance = await getClaimCount();
      const beneficiaryBalance = await getBeneficiaryClaims(walletAddress);
      console.log(balance, beneficiaryBalance);
      return { balance, beneficiaryBalance };
    },
    {
      enabled: !!currentUser && !!currentUser?.projects?.length && !!projectId,
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
