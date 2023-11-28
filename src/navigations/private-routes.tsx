import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  console.log("PRIVATE ROUTE", isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/landing" />
      }
    />
  );
};

export default PrivateRoute;
