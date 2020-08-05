import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { fetchParticipants } from '../../actions';
import { connect } from 'react-redux';
import { UsersToolbar, UsersTable } from './components';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from './components/SearchBar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const fields = [
  { key: 'username', value: 'User Name' },
  { key: 'login', value: 'Login' },
  { key: 'birth_date', value: 'Date of birth' },
  { key: 'gender', value: 'Gender' },
  { key: 'created_at', value: 'Joined at' },
  { key: 'living', value: 'Place of Living' }
];

const ParticipantsList = props => {
  const classes = useStyles();
  const { participants, fetchParticipants } = props;
  const [participantsList, setParticipantsList] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  useEffect(() => {
    setParticipantsList(participants.participants);
  }, [participants]);

  const renderUserTable = () => {
    if (!participantsList) return <CircularProgress color="secondary" />;
    return <UsersTable users={participantsList} />;
  };
  const handleSearchData = data => {
    setParticipantsList(data);
  };
  return (
    <div className={classes.root}>
      <UsersToolbar whatToAdd={'Add Participants'} />
      <SearchBar
        whatTosearchFor={'Search for a Participant'}
        fields={fields}
        data={participants}
        onSearchForData={handleSearchData}
      />
      <div className={classes.content}>{renderUserTable()}</div>
    </div>
  );
};

const mapStateToProps = ({ participants }) => ({
  participants
});

export default connect(mapStateToProps, { fetchParticipants })(
  ParticipantsList
);
