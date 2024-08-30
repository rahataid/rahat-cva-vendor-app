import useAppStore from "@store/app";
import { decodeToken, isTokenExpired } from "@utils/authToken";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser, isAuthenticated } = useAppStore();

  if (!currentUser || !isAuthenticated) {
    return <Redirect to="/landing" />;
  }

  const accessToken = currentUser?.accessToken;
  if (!accessToken) {
    return <Redirect to="/refresh-access-token" />;
  }
  const tokenPayload = decodeToken(accessToken);
  if (!tokenPayload || isTokenExpired(tokenPayload)) {
    return <Redirect to="/refresh-access-token" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
