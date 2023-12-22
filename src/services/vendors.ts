import { axiosInstance, endpoints } from "../utils/axios";

type addVendorPayload = {
  name: string;
  phone: string;
};

const VendorsService = {
  list: (params?: any) => axiosInstance.get(endpoints.vendors.list, { params }),
  details: (walletAddress: string) =>
    axiosInstance.get(endpoints.vendors.details(walletAddress)),
  update: (walletAddress: string, data: any) =>
    axiosInstance.patch(endpoints.vendors.update(walletAddress), { ...data }),
  add: (payload: addVendorPayload) =>
    axiosInstance.post(endpoints.vendors.add, payload),
  getChainData: (walletAddress: string) =>
    axiosInstance.get(endpoints.vendors.getChainData(walletAddress)),
  acceptPendingTokens: (walletAddress: string) =>
    axiosInstance.get(endpoints.vendors.acceptTokens(walletAddress)),
  syncTransactions: (signedMessage: string) =>
    axiosInstance.post(endpoints.vendors.syncTransactions, signedMessage),
};

export default VendorsService;
