import axios from "axios";
import { getAppSettings, getKey } from "./sessionManager";
// config

// ----------------------------------------------------------------------
const HOST_API = getAppSettings("baseUrl") || "";
export const axiosInstance = axios.create({
  baseURL: HOST_API,
  //   headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.request.use(
  (req) => {
    let hasInternetAccess = getKey("internetAccess");

    console.log("AXIOS INTERCEPTOR REQ HAS INTERNET ACCESS", hasInternetAccess);

    if (hasInternetAccess === null) {
      hasInternetAccess = true;
    }

    if (hasInternetAccess === "false") {
      console.log("APP DOESN'T HAVE INTERNET ACCESS");
      throw new Error("APP DOESN'T HAVE INTERNET ACCESS");
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
  },
  beneficiaries: {
    list: "/beneficiaries",
  },
  transactions: {
    list: "/transactions",
    details: (txHash: string) => `/transactions/${txHash}`,
  },
};
