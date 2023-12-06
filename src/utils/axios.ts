import axios from "axios";
import { HOST_API } from "../config";
import { getKey } from "./sessionManager";
// config

// ----------------------------------------------------------------------
console.log("HOST_API", HOST_API);
export const axiosInstance = axios.create({
  baseURL: HOST_API,
  //   headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.request.use(
  (req) => {
    let hasInternetAccess = getKey("internetAccess");
    if (!hasInternetAccess) hasInternetAccess = true;
    else if (hasInternetAccess === "true") hasInternetAccess = true;
    else if (hasInternetAccess === "false") hasInternetAccess = false;
    console.log("AXIOS INTERCEPTOR REQ HAS INTERNET ACCESS", hasInternetAccess);
    if (!hasInternetAccess) {
      console.log("APP DOESNT HAVE INTERNET ACCESS");
      throw { message: "APP DOESNT HAVE INTERNET ACCESS" };
      const controller = new AbortController();
      const cfg = {
        ...req,
        signal: controller.signal,
      };
      controller.abort("We gotta cancel this");
      return cfg;
    } else return req;
  },
  function (error) {
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
