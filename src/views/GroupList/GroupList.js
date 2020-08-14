import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';

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
    marginTop: theme.spacing(4)
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

  const [GroupsList, setGroupsList] = useState([]);

  const handleSearchData = data => {
    setGroupsList(data);
  };

  useEffect(() => {
    fetchGroups();
    setGroupsList(groups.groups);
  }, []);

  useEffect(() => {
    setGroupsList(groups.groups);
  }, [props.groups.groups]);

  const renderGroupsCards = () => {
    if (!GroupsList || GroupsList.length === 0) {
      return <CircularProgress color="secondary" className={classes.content} />;
    }
    return (
      <Grid container className={classes.cardList}>
        {GroupsList.map(group => {
          return <GroupCard Group={group} />;
        })}
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <GroupsToolbar />
      <SearchBar
        whatTosearchFor={''}
        fields={fields}
        data={groups.groups}
        onSearchForData={handleSearchData}
      />
      {renderGroupsCards()}
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
