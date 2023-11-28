export const HOST_API =
  import.meta.env.API_HOST || "http://localhost:5500/api/v1";
export const DEFAULT_PASSCODE = import.meta.env.DEFAULT_PASSCODE || "9670";

export const CONTRACTS = {
  RAHATTOKEN: "RahatToken",
  CVAPROJECT: "CVAProject",
  COMMUNITY: "RahatCommunity",
  DONOR: "RahatDonor",
  CLAIM: "RahatClaim",
};
