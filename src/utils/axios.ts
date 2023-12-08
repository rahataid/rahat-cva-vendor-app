import useAppStore from "@store/app";
import axios from "axios";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (req) => {
    let hasInternetAccess = useAppStore.getState().internetAccess;

    if (hasInternetAccess === false) {
      console.error("No internet access" + "URL:", req.url);
    }

    return req;
  },
  (error) => {
    console.log("---->", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(
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
  appSettings: {
    blockchain: "/app/blockchain",
    contracts: "/app/contracts",
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
    getChainData: (walletAddress: string) =>
      `/vendors/${walletAddress}/chainData`,
  },
  beneficiaries: {
    list: "/beneficiaries",
    details: (walletAddress: string) => `/beneficiaries/${walletAddress}`,
    charge: (phone: string) => `/beneficiaries/${phone}/charge`,
  },
  transactions: {
    list: "/transactions",
    details: (txHash: string) => `/transactions/${txHash}`,
  },
};
