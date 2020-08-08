import React, { useState, useEffect } from 'react';
import {
  List,
  Container,
  makeStyles,
  Avatar,
  Typography
} from '@material-ui/core';
import { fetchModerators } from '../../../actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { default as ModeratorsList } from '../../../utils/DataList';

import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ModeratorDataList = props => {
  const classes = useStyles();
  const { moderators, fetchModerators } = props;

  const [moderatorsList, setModeratorsList] = useState([]);

  useEffect(() => {
    fetchModerators();
  }, []);

  useEffect(() => {
    setModeratorsList(moderators.moderators);
  }, [moderators.moderators]);

  const filtering = data => {
    const ids = props.existedModerators?.map(el => el._id);

    let res = data.filter(el => {
      return ids.includes(el._id) === false;
    });

    return res;
  };

  const renderModeratorTransferList = () => {
    if (!moderatorsList || moderatorsList.length === 0) {
      return <CircularProgress color="secondary" />;
    }
    return (
      <ModeratorsList
        left={filtering(moderatorsList)}
        right={props.existedModerators}
        OnChoosedData={props.choosedModerators}
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
        Add Moderators to the group
      </Typography>
      <form className={classes.form} noValidate>
        {renderModeratorTransferList()}
      </form>
    </div>
  );
};

const mapStateToProps = ({ moderators }) => ({
  moderators
});

export default connect(mapStateToProps, { fetchModerators })(ModeratorDataList);
