import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Box, Grid, Switch } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff'
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 12,
    width: 12
  },
  actions: {
    justifyContent: 'flex-end'
  },

  dot: {
    marginTop: '5px',
    marginRight: '5px',
    height: '10px',
    width: '10px',
    backgroundColor: '#66B033',
    borderRadius: '50%',
    display: 'inline-block'
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
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell> Latest 10 Groups </StyledTableCell>
            <StyledTableCell align="left">Moderators</StyledTableCell>
            <StyledTableCell align="left">Participants&nbsp;</StyledTableCell>
            <StyledTableCell align="left">Polls&nbsp;</StyledTableCell>
            <StyledTableCell align="left">Discussions&nbsp;</StyledTableCell>
            <StyledTableCell align="left">Status&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows().map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.moderators}</StyledTableCell>
              <StyledTableCell align="left">{row.participants}</StyledTableCell>
              <StyledTableCell align="left">{row.polls}</StyledTableCell>
              <StyledTableCell align="left">{row.discussions}</StyledTableCell>
              <StyledTableCell>
                <Box display="flex">
                  <span className={classes.dot}></span>{' '}
                  <Typography variant="body1">Active</Typography>
                </Box>
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
