import BeneficiariesService from "@services/beneficiaries";
import useAppStore from "@store/app";
import { useMutation } from "@tanstack/react-query";

export const useChargeBeneficiary = () => {
  const { setTasks } = useAppStore.getState();
  return useMutation(
    ({ data, phone }: { data: any; phone: string }) =>
      BeneficiariesService.chargeBeneficiary(phone, data),
    {
      onMutate: async ({ data, phone }) => {
        const key = "chargeBeneficiary";
        console.log("data", data);

        await setTasks(key, {
          payload: {
            data,
            phone,
          },
          callFn: BeneficiariesService.chargeBeneficiary,
          params: [phone, { data }],
        });
      },
    }
  );
};
