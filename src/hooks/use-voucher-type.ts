import { BENEFICIARY_VOUCHER_DETAILS, VOUCHER } from "@types/beneficiaries";
import { isVoucherClaimed } from "@utils/helperFunctions";
import { useEffect, useState } from "react";

const useVoucherType = (voucher: BENEFICIARY_VOUCHER_DETAILS) => {
  const [voucherType, setVoucherType] = useState<VOUCHER | null>(null);
  const [isClaimed, setIsClaimed] = useState<boolean>(true);

  useEffect(() => {
    if (voucher) {
      if (voucher.FreeVoucherClaimStatus !== null) {
        setVoucherType(VOUCHER.FREE_VOUCHER);
      } else if (voucher.ReferredVoucherClaimStatus !== null) {
        setVoucherType(VOUCHER.DISCOUNT_VOUCHER);
      }

      if (isVoucherClaimed(voucher)) {
        setIsClaimed(true);
      } else {
        setIsClaimed(false);
      }
    }
  }, [voucher]);

  return { voucherType, isVoucherClaimed: isClaimed };
};

export default useVoucherType;
