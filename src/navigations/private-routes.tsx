import useAppStore from "@store/app";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/landing' />
      }
    />
  );
};

export default PrivateRoute;
