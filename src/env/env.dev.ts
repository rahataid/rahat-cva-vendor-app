import { IContracts } from "../types/env";

export class ENV {
  public static ENV: string = "DEV";
  public static DEFAULT_PASSCODE: string = "9670";
  public static CONTRACTS: IContracts = {
    RAHATTOKEN: "RahatToken",
    CVAPROJECT: "CVAProject",
    COMMUNITY: "RahatCommunity",
    DONOR: "RahatDonor",
    CLAIM: "RahatClaim",
  };
}
