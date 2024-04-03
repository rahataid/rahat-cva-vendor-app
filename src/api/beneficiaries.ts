import { useQuery } from "@tanstack/react-query";
import useTransactionStore from "../store/transaction";

export function useReferredBeneficiariesList() {
  const { getReferredBeneficiaryList } = useTransactionStore();
  const { data, isLoading, error } = useQuery(
    ["referredBeneficiaryList"],
    async () => {
      const res = await getReferredBeneficiaryList();
      return res?.data?.data?.result || [];
    },
    {
      staleTime: 0,
    }
  );

  return {
    data: data,
    isLoading,
    error,
  };
}
