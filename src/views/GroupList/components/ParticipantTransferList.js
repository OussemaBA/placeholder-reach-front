import React, { useState, useEffect } from 'react';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import { fetchParticipants } from '../../../actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { default as ParticipantsList } from '../../../utils/DataList';

import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ParticipantDataList = props => {
  const classes = useStyles();
  const { participants, fetchParticipants } = props;

  const [participantsList, setParticipantsList] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  useEffect(() => {
    setParticipantsList(participants.participants);
  }, [participants.participants]);

  const filtering = data => {
    const ids = props.existedParticipants?.map(el => el._id);

    let res = data.filter(el => {
      return ids.includes(el._id) === false;
    });

    return res;
  };

  const renderParticipantsTransferList = () => {
    if (!participantsList || participantsList.length === 0) {
      return <CircularProgress color="secondary" />;
    }

    return (
      <ParticipantsList
        left={filtering(participantsList)}
        right={props.existedParticipants}
        OnChoosedData={props.choosedParticipants}
      />
    );
  };

  /*********RETURN********/
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <GroupAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add participants to the group
      </Typography>
      <form className={classes.form} noValidate>
        {renderParticipantsTransferList()}
      </form>
    </div>
  );
};

const mapStateToProps = ({ participants }) => ({
  participants
});

export default connect(mapStateToProps, { fetchParticipants })(
  ParticipantDataList
);
