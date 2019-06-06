import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import constants from '../../utils/constants';

const SecuredLayout = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem(constants.localStorage.isAuth);
  return (
    <Route
      {...rest}
      render={matchProps =>
        isAuthenticated ? (
          <div className="ui">
            <Header />
            <Component {...matchProps} />
            <Footer />
          </div>
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: matchProps.location } }}
          />
        )
      }
    />
  );
};

SecuredLayout.propTypes = {
  component: PropTypes.any.isRequired,
};

SecuredLayout.displayName = 'SecuredLayoutComponent';

export default SecuredLayout;
