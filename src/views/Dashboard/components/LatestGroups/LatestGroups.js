import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { connect } from 'react-redux';

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestGroups = props => {
  const { className, groups, ...rest } = props;

  const classes = useStyles();
  const [state, setState] = React.useState();

  const [Groups, setGroups] = useState(groups.groups);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function createData(
    name,
    participants,
    moderators,
    polls,
    discussions,
    state
  ) {
    return { name, participants, moderators, polls, discussions, state };
  }

  const rows = () =>
    Groups.map(
      ({ name, participants, moderators, polls, discussions, state }) =>
        createData(
          name,
          participants.length,
          moderators.length,
          polls.length,
          discussions.length,
          state
        )
    );

  useEffect(() => {
    setGroups(groups.groups);
  }, [groups.groups]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> Latest 10 Groups </StyledTableCell>
            <StyledTableCell align="right">Moderators</StyledTableCell>
            <StyledTableCell align="right">Participants&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Polls&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Discussions&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Hide&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows().map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.moderators}</StyledTableCell>
              <StyledTableCell align="right">
                {row.participants}
              </StyledTableCell>
              <StyledTableCell align="right">{row.polls}</StyledTableCell>
              <StyledTableCell align="right">{row.discussions}</StyledTableCell>
              <StyledTableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <AntSwitch
                      checked={row.hidden}
                      onChange={handleChange}
                      name={row.hidden}
                    />
                  </Grid>
                  <Grid item>On</Grid>
                </Grid>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LatestGroups.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = ({ groups }) => ({
  groups
});

export default connect(mapStateToProps)(LatestGroups);
