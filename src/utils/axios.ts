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
    blockchain: "/api/v1/app/blockchain",
    contracts: "/api/v1/app/contracts",
    contractDetails: (name: string) => `/api/v1/app/contracts/${name}`,
    settings: (name: string) => `/api/v1/app/settings?name=${name}`,
  },
  auth: {
    loginWallet: "/api/v1/auth/login-wallet",
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    sendOtp: "/api/v1/auth/send-otp",
    create: "/api/v1/users",
  },

  vendors: {
    list: "/api/v1/vendors",
    details: (walletAddress: string) => `/api/v1/vendors/${walletAddress}`,
    update: (walletAddress: string) => `/api/v1/vendors/${walletAddress}`,
    add: `/api/v1/vendors`,
    chargeByPhone: (walletAddress: string) =>
      `/api/v1/vendors/${walletAddress}/chargeBeneficiary`,
    blockchain: "/api/v1/vendors/blockchain",
  },
  beneficiaries: {
    list: "/api/v1/beneficiaries",
    details: (walletAddress: string) =>
      `/api/v1/beneficiaries/${walletAddress}`,
    chargeByPhone: (phone: string) => `/api/v1/beneficiaries/${phone}/charge`,
  },
  transactions: {
    list: "/api/v1/transactions",
    details: (txHash: string) => `/api/v1/transactions/${txHash}`,
  },
  projects: {
    getProjectOfflineBeneficaries: (contractAddress: string) =>
      `/api/v1/projects/${contractAddress}/offlineBeneficiaries`,
  },
};
