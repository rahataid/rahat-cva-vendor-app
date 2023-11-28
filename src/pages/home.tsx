import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/title.css";
import { useCallback, useEffect, useState } from "react";
import Home from "../sections/home";
import useProjectContract, {
  useProject,
} from "../services/contracts/useProject";
import useVendorStore from "../store/vendors";
import useAppStore from "@store/app";
import { useChainData } from "@hooks/contracts/useChainData";
import { getCurrentUser } from "@utils/sessionManager";

const HomePage: React.FC = () => {
  // const { getVendorChainData, projectContractWS: ProjectContractWS } =
  //   useProjectContract();
  // const { chainData, setChainData } = useVendorStore((state) => ({
  //   chainData: state.chainData,
  //   setChainData: state.setChainData,
  // }));

  // console.log("chainData", chainData);

  // const handleGetVendorChainData = useCallback(async () => {
  //   const vendorChainData = await getVendorChainData(
  //     "0xd55B0c06274fA99a9276D5E3497f005C0636AC1c"
  //   );

  //   setChainData(vendorChainData);
  // }, [getVendorChainData, setChainData]);

  // useEffect(() => {
  //   if (chainData?.isVendor !== null) return;

  //   // handleGetVendorChainData();
  // }, [chainData, getVendorChainData, handleGetVendorChainData]);

  // useEffect(() => {
  //   if (!ProjectContractWS) return;

  //   ProjectContractWS.on("VendorAllowance", handleGetVendorChainData);
  //   ProjectContractWS.on("VendorAllowanceAccept", handleGetVendorChainData);

  //   return () => {
  //     ProjectContractWS?.removeAllListeners();
  //   };
  // }, [ProjectContractWS, handleGetVendorChainData]);

  const currentUser = getCurrentUser();
  const vendorAddress = currentUser?.walletAddress;
  console.log(vendorAddress, "current user wallet address");

  const [vendorData, setVendorData] = useState({});

  const {
    getProjectBalance,
    checkIsVendorApproved,
    checkIsProjectLocked,
    getPendingTokensToAccept,
    getVendorAllowance,
    acceptTokensByVendor,
    getDisbursed,
  } = useProject();

  const projectBalance = useChainData(
    "CVAProject-getProjectBalance",
    getProjectBalance
  );

  const isProjectLocked = useChainData(
    "CVAProject-checkIsProjectLocked",
    checkIsProjectLocked
  );

  const isVendorApproved = useChainData(
    "COMMUNITY-checkIsVendorApproved",
    checkIsVendorApproved,
    [vendorAddress]
  );

  const allowance = useChainData(
    "CVAProject-getVendorAllowance",
    getVendorAllowance,
    [vendorAddress]
  );

  const disbursed = useChainData("CVAProject-getDisbursed", getDisbursed, [
    vendorAddress,
  ]);

  let pendingTokensToAccept = useChainData(
    "CVAProject-getPendingTokensToAccept",
    getPendingTokensToAccept,
    [vendorAddress]
  );

  const acceptPendingTokens = async () => {
    console.log("ACCEPT PENDING TOKENS");
    const res = await acceptTokensByVendor(pendingTokensToAccept);

    console.log("ACCEPT RES", res);
    console.log("PENDING TOKENS", pendingTokensToAccept);
  };

  const homeProps = {
    projectBalance,
    allowance,
    isVendorApproved,
    isProjectLocked,
    pendingTokensToAccept,
    disbursed,
    acceptPendingTokens,
  };

  console.log("VENDOR DATA", homeProps);

  // useEffect(() => {
  //   console.log(allowance);
  // }, [allowance]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title-center">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Home {...homeProps} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
