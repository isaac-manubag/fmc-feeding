import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import constants from "../../utils/constants";

const AuthLayout = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem(constants.localStorage.isAuth);
  return (
    <Route
      {...rest}
      render={matchProps =>
        !isAuthenticated ? (
          <Component {...matchProps} />
        ) : (
          <Redirect
            to={{ pathname: "/kids", state: { from: matchProps.location } }}
          />
        )
      }
    />
  );
};

AuthLayout.propTypes = {
  component: PropTypes.any.isRequired
};

AuthLayout.displayName = "AuthLayoutComponent";

export default AuthLayout;
