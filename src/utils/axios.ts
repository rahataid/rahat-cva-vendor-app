import useAppStore from "@store/app";
import axios from "axios";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (req) => {
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
      error,
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
    getByPhone: (phone: string) => `/beneficiaries/phone/${phone}`,
  },
  transactions: {
    list: "/transactions",
    details: (txHash: string) => `/transactions/${txHash}`,
  },
  projects: {
    actions: (uuid: string) => `/projects/${uuid}/actions`,
  },
  users: {
    vendors: {
      add: "/users/vendors",
      getByUuid: (uuid: string) => `/users/vendors/${uuid}`,
    },
  },
};
