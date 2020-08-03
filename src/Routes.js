import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { default as PublicRoute } from './components/RouteWithLayout/PublicRouteWithLayout';

import PrivateRouteWithLayout from './components/RouteWithLayout/PrivateRouteWithLayout';

import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  GroupList as GroupListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';
import { routes } from './config/constants';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <PublicRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path={routes.DASHBOARD}
      />
      <PublicRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path={routes.USERS}
      />
      <PublicRoute
        component={GroupListView}
        exact
        layout={MainLayout}
        path={routes.GROUPS}
      />
      <PrivateRouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PublicRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <PrivateRouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <PublicRoute
        component={SignInView}
        exact
        layout={MinimalLayout}
        path={routes.LOGIN}
      />
      <PublicRoute
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path={routes.NO_MATCH}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
