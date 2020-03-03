import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export function PrivateRoute({
  isAuthenticated,
  loading,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

const mapStateToProps = store => {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    loading: store.auth.loading
  };
};

export default connect(mapStateToProps)(PrivateRoute);
