import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Avatar
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link as RouterLink } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';

const useStyles = makeStyles(theme => ({
  root: { margin: '2%', width: 300, height: 120 },
  imageContainer: {
    height: 64,
    width: 64,

    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const GroupCard = props => {
  const { className, Group, ...rest } = props;

  const classes = useStyles();

  const maxLength = 80;
  return (
    <Card {...rest} className={classes.root}>
      <CardContent>
        {/* <div className={classes.imageContainer}>
          <Avatar
            alt={Group.name}
            className={classes.avatar}
            component={RouterLink}
            src={Group.avatar}
            to="/settings"
          />
        </div> */}
        <Typography align="center" gutterBottom variant="h6">
          {Group.name}
        </Typography>
        <Typography align="center" variant="body1">
          {Group.desc.slice(0, 30) + '...'}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <RouterLink to="/">View </RouterLink>
          </Grid>
          <Grid className={classes.statsItem} item>
            <RouterLink to="/">Edit</RouterLink>
          </Grid>
          <Grid className={classes.statsItem} item>
            <RouterLink to="/">Delete</RouterLink>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

GroupCard.propTypes = {
  className: PropTypes.string,
  Group: PropTypes.object.isRequired
};

export default GroupCard;
