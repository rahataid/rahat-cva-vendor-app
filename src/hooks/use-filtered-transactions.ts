import { BENEFICIARY_TYPE, IBeneficiary } from "@types/beneficiaries";
import { useEffect, useState } from "react";

const filterTransactions = (data: IBeneficiary[], filter: string) => {
  // await randomDelay(0, 500);
  if (filter === "ALL") return data;
  else if (filter === "REFERRED") {
    return data.filter(
      (el) => el.beneficiaryType === BENEFICIARY_TYPE.REFERRED
    );
  } else if (filter === "ENROLLED") {
    return data.filter(
      (el) => el.beneficiaryType === BENEFICIARY_TYPE.ENROLLED
    );
  }
};

export function useFilteredTransactions(
  initialTransactionList: IBeneficiary[],
  filter: string
) {
  const [filteredTransactions, setFilteredTransactions] = useState<
    IBeneficiary[]
  >(initialTransactionList);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFilteredTransactions = async () => {
      setLoading(true);
      try {
        const filteredData = filterTransactions(initialTransactionList, filter);
        setFilteredTransactions(filteredData);
      } catch (error) {
        console.error("Error fetching filtered transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredTransactions();
  }, [filter, initialTransactionList]);

  return { filteredTransactions, loading };
}
