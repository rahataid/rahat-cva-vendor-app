import { BENEFICIARY_VOUCHER_DETAILS, VOUCHER } from "@types/beneficiaries";
import { useEffect, useState } from "react";

const useVoucherType = (voucher: BENEFICIARY_VOUCHER_DETAILS) => {
  const [voucherType, setVoucherType] = useState<VOUCHER | null>(null);

  useEffect(() => {
    if (voucher) {
      if (voucher.FreeVoucherClaimStatus !== null) {
        setVoucherType(VOUCHER.FREE_VOUCHER);
      } else if (voucher.ReferredVoucherClaimStatus !== null) {
        setVoucherType(VOUCHER.DISCOUNT_VOUCHER);
      }
    }
  }, [voucher]);

  return { voucherType };
};

export default useVoucherType;
