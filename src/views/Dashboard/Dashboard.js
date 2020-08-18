import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalModerators,
  TotalParticipants,
  TotalGroups,
  TotalProfit,
  LatestGroups,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalModerators />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalParticipants />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalGroups />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>

        <Grid item lg={12} md={12} xl={3} xs={12}>
          <LatestGroups />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;