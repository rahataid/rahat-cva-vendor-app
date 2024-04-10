import { useQuery } from "@tanstack/react-query";
import useTransactionStore from "../store/transaction";

export function useReferredBeneficiariesList() {
  const { getReferredBeneficiaryList } = useTransactionStore();
  const { data, isLoading, error, refetch, isFetching } = useQuery(
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
    isFetching,
  };
}

export function useReferredBeneficiariesDetails({
  uuid,
  beneficiaryDetails,
}: any) {
  const { getBeneficiaryDetailsByUuid } = useTransactionStore();
  const { data, isLoading, error } = useQuery(
    ["referredBeneficiaryDetails", uuid],
    async () => {
      const res = await getBeneficiaryDetailsByUuid(uuid);
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
  const { getBeneficiaryDetailsByWallet, getBeneficiaryReferredDetailsByUuid } =
    useTransactionStore();
  const { data, isLoading, error } = useQuery(
    ["beneficiaryDetails", walletAddress],
    async () => {
      console.log("before api call");
      // const res = await getBeneficiaryDetailsByWallet(walletAddress);
      // console.log(res, "res");
      // if (res?.data?.data) {
      const secondRes = await getBeneficiaryReferredDetailsByUuid(
        // res?.data?.data?.uuid
        "7e0a861d-da12-4bec-b4d3-ceb18e98adeb"
      );
      console.log(secondRes, "secondRes");
      //   return { beneficiaryDetails: res.data.data, secondData: secondRes };
      // }
      return secondRes || {};
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
