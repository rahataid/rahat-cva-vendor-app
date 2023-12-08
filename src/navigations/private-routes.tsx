import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
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
