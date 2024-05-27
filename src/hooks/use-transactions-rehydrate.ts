import useTransactionStore from "@store/transaction";
import { useEffect } from "react";

export function useTransactionsRehydrate() {
  const {
    transactions,
    setVendorTransactions,
    getVendorTransactions,
    triggerUpdateState,
  } = useTransactionStore();

  useEffect(() => {
    const execute = async () => {
      const vendorTransactions = await getVendorTransactions();
      setVendorTransactions(vendorTransactions);
    };

    if (transactions?.length) execute();
  }, [transactions, triggerUpdateState]);
}
