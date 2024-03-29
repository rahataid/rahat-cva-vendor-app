import { createContext, useContext } from "react";
import useAppStore from "../store/app";
import { GraphQuery } from "@rahataid/el-subgraph";
import { GRAPHQL_URL } from "../config";

export type GraphContextType = {
  queryService: GraphQuery;
};

export const GraphContext = createContext<GraphContextType | null>(null);

interface QueryProviderProps {
  children: React.ReactNode;
}

export function GraphQueryProvider({ children }: QueryProviderProps) {
  const queryService = new GraphQuery(GRAPHQL_URL);

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
