import React from "react";
import { Route } from "react-router-dom";

const NormalRoute = (props) => {
  const { exact, path, component, ...rest } = props;

  const Component = component;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routerProps) => <Component {...routerProps} {...rest} />}
    />
  );
};

export default NormalRoute;
