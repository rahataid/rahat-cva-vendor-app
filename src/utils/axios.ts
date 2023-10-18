import axios from "axios";
import { HOST_API } from "../config";
// config

// ----------------------------------------------------------------------
console.log("HOST_API", HOST_API);
export const axiosInstance = axios.create({
  baseURL: HOST_API,
  //   headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("error", error);
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
  },
  transactions: {
    list: "/transactions",
    details: (txHash: string) => `/transactions/${txHash}`,
  },
};
