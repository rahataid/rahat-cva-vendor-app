import { useVendorChainData } from "@api/vendors";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Home from "../sections/home";
import "../theme/title.css";
import VendorsService from "@services/vendors";
import useAppStore from "@store/app";
import { useEffect, useState } from "react";
import CustomHeader from "@components/header/customHeader";
import useAppNewStore from "@store/app";
import useBeneficiaryStore from "@store/beneficiaries";
import useMyStore from "@store/temp";

// const HomePage: React.FC = () => {
//   const { newChainData, newIsAuthenticated } = useAppNewStore();
//   console.log({ newChainData, newIsAuthenticated });

//   return (
//     <IonPage>
//       <CustomHeader title="Home" showStatus />
//       <IonContent fullscreen>HOME</IonContent>
//     </IonPage>
//   );
// };

const HomePage: React.FC = () => {
  const { wallet } = useAppStore();
  const { beneficiaries } = useBeneficiaryStore();
  console.log("HOME BENE", beneficiaries);

  const [forceRender, setForceRender] = useState(false);
  const handleReload = () => {
    setForceRender(!forceRender);
  };

  const { chainData } = useVendorChainData(wallet?.address, forceRender);

  const acceptPendingTokens = async () => {
    await VendorsService.acceptPendingTokens(vendorAddress);
  };

  // useEffect(() => {
  //   // This code will run after 3 seconds
  //   const timeoutId = setTimeout(() => {
  //     console.log("Code executed after 3 seconds");
  //     increment();
  //     setAnimals(["cow", "dog", "cat"]);
  //     // Your additional code here
  //   }, 3000);

  //   // Cleanup the timeout if the component unmounts before the timeout completes
  //   return () => clearTimeout(timeoutId);
  // }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <IonPage>
      <CustomHeader title="Home" showStatus />
      <IonContent fullscreen>
        <Home
          allowance={chainData?.allowance}
          isVendor={chainData?.isVendorApproved}
          isProjectLocked={chainData?.isProjectLocked}
          disbursed={chainData?.disbursed}
          pendingTokensToAccept={chainData?.pendingTokens}
          acceptPendingTokens={acceptPendingTokens}
          handleReload={handleReload}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

// import useStore from "@utils/storetemp";
// import React, { useEffect } from "react";

// const App = () => {
//   const { counter, increment } = useStore((state) => ({
//     counter: state.counter,
//     increment: state.increment,
//   }));

//   useEffect(() => {
//     // Use the onRehydrate callback to perform additional actions after loading the state
//     useStore.setState((state) => {
//       return {
//         ...state,
//         // Set the counter value from IndexedDB
//         counter: state.counter, // Replace with the actual key you used in IndexedDB
//       };
//     });
//   }, []); // Empty dependency array ensures it runs only on mount

//   return (
//     <div>
//       <h1>Counter: {counter}</h1>
//       <button onClick={increment}>Increment</button>
//     </div>
//   );
// };

// export default App;
