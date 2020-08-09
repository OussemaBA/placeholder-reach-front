import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchBar from '../../utils/Search/SearchBars';
import { GroupsToolbar, GroupCard } from './components';

import { fetchGroups } from '../../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
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

const fields = [
  { key: 'name', value: 'Group name' },
  { key: 'desc', value: 'Group Description' }
];

const GroupList = props => {
  const classes = useStyles();
  const { groups, fetchGroups } = props;

  const [GroupsList, setGroupsList] = useState(groups.groups);

  const handleSearchData = data => {
    setGroupsList(data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    setGroupsList(groups.groups);
  }, [groups.groups]);

  return (
    <div className={classes.root}>
      <GroupsToolbar />
      <SearchBar
        whatTosearchFor={'Search for a Moderators'}
        fields={fields}
        data={groups.groups}
        onSearchForData={handleSearchData}
      />

      <Grid container className={classes.cardList}>
        {GroupsList.map(group => (
          <GroupCard Group={group} />
        ))}
      </Grid>

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
