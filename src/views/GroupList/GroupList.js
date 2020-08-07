import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchInput from '../../utils/Search/SearchInput';
import { GroupsToolbar, GroupCard } from './components';

import { fetchGroups } from '../../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const GroupList = props => {
  const classes = useStyles();
  const { groups, fetchGroups } = props;

  const [Groups, setGroups] = useState(groups.groups);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    setGroups(groups.groups);
  }, [groups.groups]);

  return (
    <div className={classes.root}>
      <GroupsToolbar />
      {/* <SearchInput
        className={classes.searchInput}
        placeholder="Search for a Group"
      /> */}
      <div className={classes.content}>
        <Grid item>
          {Groups.map(group => (
            <Grid item key={group._id} lg={6} sm={12} md={6} xl={12} xs={12}>
              <GroupCard Group={group} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

const mapStateToProps = ({ groups }) => ({
  groups
});

export default connect(mapStateToProps, { fetchGroups })(GroupList);
