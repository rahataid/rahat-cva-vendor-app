import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/title.css";
import { useCallback, useEffect } from "react";
import Home from "../sections/home";
import useProjectContract from "../services/contracts/useProject";
import useVendorStore from "../store/vendors";

const HomePage: React.FC = () => {
  const { getVendorChainData, projectContractWS: ProjectContractWS } =
    useProjectContract();
  const { chainData, setChainData } = useVendorStore((state) => ({
    chainData: state.chainData,
    setChainData: state.setChainData,
  }));

  console.log("chainData", chainData);

  const handleGetVendorChainData = useCallback(async () => {
    const vendorChainData = await getVendorChainData(
      "0xd55B0c06274fA99a9276D5E3497f005C0636AC1c"
    );

    setChainData(vendorChainData);
  }, [getVendorChainData, setChainData]);

  useEffect(() => {
    if (chainData?.isVendor !== null) return;

    // handleGetVendorChainData();
  }, [chainData, getVendorChainData, handleGetVendorChainData]);

  useEffect(() => {
    if (!ProjectContractWS) return;

    ProjectContractWS.on("VendorAllowance", handleGetVendorChainData);
    ProjectContractWS.on("VendorAllowanceAccept", handleGetVendorChainData);

    return () => {
      ProjectContractWS?.removeAllListeners();
    };
  }, [ProjectContractWS, handleGetVendorChainData]);

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
        <Home />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
