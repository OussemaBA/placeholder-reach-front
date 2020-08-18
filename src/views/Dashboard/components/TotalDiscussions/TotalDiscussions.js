import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchDiscussions } from '../../../../actions';
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
    backgroundColor: theme.palette.error.main,
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
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalDiscussions = props => {
  const { className, discussions, fetchDiscussions, ...rest } = props;

  const classes = useStyles();
  const [discussionsNumber, setDiscussionsNumber] = useState(undefined);

  const fetchDiscussionsNumber = async () => {
    fetchDiscussions();
    setDiscussionsNumber(discussions.discussions.length);
  };

  const renderDiscussionsNumber = () => {
    if (!discussionsNumber) return <CircularProgress color="secondary" />;
    return <Typography variant="h3">{discussionsNumber}</Typography>;
  };

  useEffect(() => {
    fetchDiscussionsNumber();
  }, [discussions.discussions.length]);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2">
              TOTAL DISCUSSIONS
            </Typography>
            {renderDiscussionsNumber()}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <QuestionAnswerIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalDiscussions.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  discussions: state.discussions
});

export default connect(mapStateToProps, { fetchDiscussions })(TotalDiscussions);
