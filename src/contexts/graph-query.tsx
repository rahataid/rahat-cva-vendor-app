import { GraphQuery } from "@rahat";
import { createContext, useContext } from "react";
import useAppStore from "../store/app";

export type GraphContextType = {
  queryService: GraphQuery;
};

export const GraphContext = createContext<GraphContextType | null>(null);

interface QueryProviderProps {
  children: React.ReactNode;
}

export function GraphQueryProvider({ children }: QueryProviderProps) {
  const graphQlUrl = useAppStore(
    (state) => state?.projectSettings?.subGraph?.URL
  );
  const queryService = new GraphQuery(graphQlUrl);

  return (
    <GraphContext.Provider
      value={{
        queryService,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}
export const useGraphService = (): GraphContextType => {
  return useContext(GraphContext) as GraphContextType;
};
