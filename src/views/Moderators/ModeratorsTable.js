import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { fetchModerators } from '../../actions';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { ModeratorsTable, ModeratorsToolbar } from './components/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from '../../utils/Search/SearchBars';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const fields = [
  { key: 'username', value: 'User name' },
  { key: 'contact', value: 'Contact number' },
  { key: 'email', value: 'Email' },

  { key: 'birth_date', value: 'Date of birth' },
  { key: 'created_at', value: 'Joined at' }
];

const ModeratorsList = props => {
  const classes = useStyles();
  const { moderators, fetchModerators } = props;
  const [moderatorsList, setModeratorsList] = useState([]);

  useEffect(() => {
    fetchModerators();
  }, []);

  useEffect(() => {
    setModeratorsList(moderators.moderators);
  }, [moderators]);

  const renderUserTable = () => {
    if (!moderatorsList || moderatorsList.length === 0) {
      return <CircularProgress color="secondary" />;
    }
    return <ModeratorsTable users={moderatorsList} />;
  };

  const handleSearchData = data => {
    setModeratorsList(data);
  };
  return (
    <div className={classes.root}>
      <ModeratorsToolbar whatToAdd={'Add Moderators'} />
      <SearchBar
        whatTosearchFor={'Search for a Moderators'}
        fields={fields}
        data={moderators.moderators}
        onSearchForData={handleSearchData}
      />
      <div className={classes.content}>{renderUserTable()}</div>
    </div>
  );
};

const mapStateToProps = ({ moderators }) => ({
  moderators
});

export default connect(mapStateToProps, { fetchModerators })(ModeratorsList);
