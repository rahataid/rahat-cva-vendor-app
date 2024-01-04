// import { Drivers, Storage } from "@ionic/storage";
import { getKey, saveKey } from "@utils/sessionManager";
import { useCallback, useEffect, useState } from "react";

export const useChainData = (name: any, chainFn: any, params: any = []) => {
  const [chainData, setChainData] = useState(null);

  const executeChainFn = useCallback(async () => {
    let data = getKey("chainData-" + name);
    if (data) {
      setChainData(data);
      chainFn(...params).then(async (d: any) => {
        saveKey("chainData-" + name, d);
        setChainData(d);
      });
    } else {
      const response = await chainFn(...params);
      saveKey("chainData-" + name, response);
      setChainData(response);
    }
  }, [name, chainFn]);

  useEffect(() => {
    executeChainFn();
  }, []);

  return chainData;
};
