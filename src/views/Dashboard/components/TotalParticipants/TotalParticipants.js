import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchParticipants } from '../../../../actions';
import { connect } from 'react-redux';

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
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalParticipants = props => {
  const { className, participants, fetchParticipants, ...rest } = props;

  const classes = useStyles();

  const [participantsNumber, setParticipantsNumber] = useState(undefined);

  const renderUsersNumber = () => {
    if (!participantsNumber) return <CircularProgress color="secondary" />;
    return <Typography variant="h3">{participantsNumber}</Typography>;
  };

  useEffect(() => {
    console.log('participants', participants);
    fetchParticipants();
    setParticipantsNumber(participants.participants.length);
  }, [participants.participants.length]);

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
              TOTAL PARTICIPANTS
            </Typography>
            {renderUsersNumber()}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalParticipants.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  participants: state.participants
});

export default connect(mapStateToProps, { fetchParticipants })(
  TotalParticipants
);
