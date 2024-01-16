import useAppStore from "@store/app";
import axios from "axios";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (req) => {
    let hasInternetAccess =
      useAppStore.getState().projectSettings?.internetAccess;

    if (hasInternetAccess === false) {
      console.error("No internet access" + " URL:", req.url);
      throw new Error("NO INTERNET ACCESS");
    }

    return req;
  },
  (error) => {
    console.error("---->", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      "AXIOS INTERCEPTOR RES error",
      JSON.stringify(error),
      "=======",
      error.message
    );
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

// ----------------------------------------------------------------------

export const endpoints = {
  projectSettings: {
    blockchain: "/app/blockchain",
    contracts: "/app/contracts",
    contractDetails: (name: string) => `/app/contracts/${name}`,
    settings: (name: string) => `/app/settings?name=${name}`,
  },
  auth: {
    loginWallet: "/auth/login-wallet",
    login: "/auth/login",
    register: "/auth/register",
    sendOtp: "/auth/send-otp",
    create: "/users",
  },

  vendors: {
    list: "/vendors",
    details: (walletAddress: string) => `/vendors/${walletAddress}`,
    update: (walletAddress: string) => `/vendors/${walletAddress}`,
    add: `/vendors`,
    chargeByPhone: (walletAddress: string) =>
      `/vendors/${walletAddress}/chargeBeneficiary`,
    blockchain: "/vendors/blockchain",
  },
  beneficiaries: {
    list: "/beneficiaries",
    details: (walletAddress: string) => `/beneficiaries/${walletAddress}`,
    chargeByPhone: (phone: string) => `/beneficiaries/${phone}/charge`,
  },
  transactions: {
    list: "/transactions",
    details: (txHash: string) => `/transactions/${txHash}`,
  },
  projects: {
    getProjectOfflineBeneficaries: (contractAddress: string) =>
      `/projects/${contractAddress}/offlineBeneficiaries`,
  },
};
