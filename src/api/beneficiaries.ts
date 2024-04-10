import { useQuery } from "@tanstack/react-query";
import useTransactionStore from "../store/transaction";

export function useReferredBeneficiariesList() {
  const { getReferredBeneficiaryList } = useTransactionStore();
  const { data, isLoading, error, refetch } = useQuery(
    ["referredBeneficiaryList"],
    async () => {
      const res = await getReferredBeneficiaryList();
      return res?.data?.data?.result || [];
    },
    {
      staleTime: 60000,
    }
  );

  return {
    data: data,
    isLoading,
    error,
    refetch,
  };
}

export function useReferredBeneficiariesDetails({
  uuid,
  beneficiaryDetails,
}: any) {
  const { getReferredBeneficiaryDetails } = useTransactionStore();
  const { data, isLoading, error } = useQuery(
    ["referredBeneficiaryDetails", uuid],
    async () => {
      const res = await getReferredBeneficiaryDetails(uuid);
      return res?.data?.data || {};
    },
    {
      enabled: !beneficiaryDetails,
      staleTime: 60000,
    }
  );

  return {
    data: data,
    isLoading,
    error,
  };
}

export function useBeneficiaryDetails(walletAddress: string) {
  const { getBeneficiaryDetailsByWallet } = useTransactionStore();
  const { data, isLoading, error } = useQuery(
    ["beneficiaryDetails", walletAddress],
    async () => {
      const res = await getBeneficiaryDetailsByWallet(walletAddress);
      return res?.data?.data || {};
    },
    {
      staleTime: 60000,
    }
  );

  return {
    data: data,
    isLoading,
    error,
  };
}
