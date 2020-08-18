import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { fetchGroups } from '../../../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TotalGroups = props => {
  const { className, groups, ...rest } = props;

  const classes = useStyles();
  const [groupsNumber, setGroupsNumber] = useState(undefined);

  const fetchGroupsNumber = () => {
    props.fetchGroups();
    setGroupsNumber(groups.groups.length);
  };

  const rendergroupsNumber = () => {
    if (!groupsNumber) return <CircularProgress color="secondary" />;
    return <Typography variant="h3">{groupsNumber}</Typography>;
  };

  useEffect(() => {
    fetchGroupsNumber();
  }, [groups.groups.length]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              TOTAL GROUPS
            </Typography>
            {rendergroupsNumber()}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalGroups.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  groups: state.groups
});

export default connect(mapStateToProps, { fetchGroups })(TotalGroups);
