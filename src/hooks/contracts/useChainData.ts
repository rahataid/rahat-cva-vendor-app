// import { Drivers, Storage } from "@ionic/storage";
import { getKey, saveKey } from "@utils/sessionManager";
import { useCallback, useEffect, useState } from "react";

export const useChainData = (name: any, chainFn: any, params: any = []) => {
  const [chainData, setChainData] = useState(null);
  console.log("INSIDE USE CHAIN DATA", name);

  const executeChainFn = useCallback(async () => {
    let data = getKey("chainData-" + name);
    console.log("EXECUTE CHAIN FN chainData-" + name, data);
    if (data) {
      console.log(`${name} data exists`);
      setChainData(data);
      chainFn(...params).then(async (d: any) => {
        saveKey("chainData-" + name, d);
        setChainData(d);
      });
    } else {
      console.log(`${name} data doesnt exists`);
      const response = await chainFn(...params);
      console.log("CHAIN FN RES", name, response);
      saveKey("chainData-" + name, response);
      setChainData(response);
    }
  }, [name, chainFn]);

  useEffect(() => {
    executeChainFn();
  }, []);

  console.log("RETURN CHAIN DATA", chainData);
  return chainData;
};
