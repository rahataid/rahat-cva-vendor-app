import db from "@utils/indexdb";
import { useCallback, useEffect, useState } from "react";

export const useDataCacher = (
  name,
  chainFn,
  params = [],
  options = { loadbyDefault: true }
) => {
  const [chainData, setChainData] = useState(null);

  const getData = useCallback(async () => {
    let data = await db.get("chainData-" + name);
    if (data) {
      setChainData(data);
      chainFn(...params).then(async (d) => {
        await db.save("chainData-" + name, d);
        setChainData(d);
      });
    } else {
      const response = await chainFn(...params);
      await db.save("chainData-" + name, response);
      setChainData(response);
    }
  }, [name, chainFn]);

  useEffect(() => {
    if (options.loadbyDefault) getData();
  }, [getData]);

  return [chainData, getData];
};
