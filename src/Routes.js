import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { default as PublicRoute } from './components/RouteWithLayout/PublicRouteWithLayout';

import PrivateRouteWithLayout from './components/RouteWithLayout/PrivateRouteWithLayout';

import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  GroupList as GroupListView,
  ParticipantsList as ParticipantsListView,
  Icons as IconsView,
  ModeratorsList as ModeratorsListView,
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
        component={ParticipantsListView}
        exact
        layout={MainLayout}
        path={routes.PARTICIPANTS}
      />
      <PublicRoute
        component={GroupListView}
        exact
        layout={MainLayout}
        path={routes.GROUPS}
      />

      <PublicRoute
        component={ModeratorsListView}
        exact
        layout={MainLayout}
        path={routes.MODERATORS}
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
