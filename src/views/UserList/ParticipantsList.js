import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { fetchParticipants } from '../../actions';
import { connect } from 'react-redux';
import { UsersToolbar, UsersTable } from './components';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ParticipantsList = props => {
  const classes = useStyles();
  const { participants, fetchParticipants } = props;
  const [participantsList, setParticipantsList] = useState('');

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

  return (
    <div className={classes.root}>
      <UsersToolbar whatToAdd={'Add Participants'} />
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
