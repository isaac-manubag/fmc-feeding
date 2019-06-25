import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import constants from "../../utils/constants";
import Dashboard from "../Dashboard";

const DashboardLayout = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem(constants.localStorage.isAuth);
  return (
    <Route
      {...rest}
      render={matchProps =>
        isAuthenticated ? (
          <Dashboard component={Component} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: matchProps.location } }}
          />
        )
      }
    />
  );
};

DashboardLayout.propTypes = {
  component: PropTypes.any.isRequired
};

DashboardLayout.displayName = "DashboardLayoutComponent";

export default DashboardLayout;
