import { IAddVendorPayload, ISyncTransactionsPayload } from "../types/vendors";
import { axiosInstance, endpoints } from "../utils/axios";

const VendorsService = {
  list: (params?: any) => axiosInstance.get(endpoints.vendors.list, { params }),
  details: (walletAddress: string) =>
    axiosInstance.get(endpoints.vendors.details(walletAddress)),
  update: (walletAddress: string, data: any) =>
    axiosInstance.patch(endpoints.vendors.update(walletAddress), { ...data }),
  add: (payload: IAddVendorPayload) =>
    axiosInstance.post(endpoints.vendors.add, payload),
  getChainData: (walletAddress: string) =>
    axiosInstance.get(endpoints.vendors.getChainData(walletAddress)),
  acceptPendingTokens: (walletAddress: string) =>
    axiosInstance.get(endpoints.vendors.acceptTokens(walletAddress)),
  syncTransactions: (payload: ISyncTransactionsPayload) =>
    axiosInstance.post(endpoints.vendors.syncTransactions, payload),
};

export default VendorsService;
