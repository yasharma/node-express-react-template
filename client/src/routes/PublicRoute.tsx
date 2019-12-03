import React from "react";
import {
  Route,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";
export const PublicRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error("PublicRoute component is undefined");
  }
  const Component = component;
  return <Route {...rest} render={(props: RouteComponentProps) => (
      <Component {...props} />
  )} />;
};
