import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { fetchParticipants } from '../../actions';
import { connect } from 'react-redux';
import { ParticipantsToolbar, ParticipantsTable } from './components';
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
  { key: 'login', value: 'Login' },
  { key: 'contact', value: 'Contact number' },
  { key: 'living', value: 'Place of living' },
  { key: 'birth_date', value: 'Date of birth' },
  { key: 'gender', value: 'Gender' },
  { key: 'created_at', value: 'Joined at' }
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
    if (!participantsList || participantsList.length === 0)
      return <CircularProgress color="secondary" />;
    return <ParticipantsTable users={participantsList} />;
  };
  const handleSearchData = data => {
    setParticipantsList(data);
  };
  return (
    <div className={classes.root}>
      <ParticipantsToolbar
        whatToAdd={'New Participant'}
        data={participantsList}
      />
      <SearchBar
        fields={fields}
        data={participants.participants}
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
