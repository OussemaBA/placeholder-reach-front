import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, ...rest }) => {
  let isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated === 'true' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: 'sign-in',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const PrivateRouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <PrivateRoute>
      <Route
        {...rest}
        render={matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    </PrivateRoute>
  );
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default PrivateRouteWithLayout;
