import axios from "axios";
import { endpoints } from "../utils/axios";

interface GetAuthPayload {
  challenge: string;
  signature: string;
}

const AuthService = {
  addVendor: async (url: string, payload: any) =>
    axios.post(`${url}${endpoints.vendors.add}`, payload),
  getVendor: async (url: string, walletAddress: string) =>
    axios.get(`${url}${endpoints.vendors.getByUuid(walletAddress)}`),
  getAuthToken: async (url: string, payload: GetAuthPayload) =>
    axios.post(`${url}${endpoints.auth.token}`, payload),
  getChallenge: async (url: string) =>
    axios.post(`${url}${endpoints.auth.challenge}`),
};

export default AuthService;
