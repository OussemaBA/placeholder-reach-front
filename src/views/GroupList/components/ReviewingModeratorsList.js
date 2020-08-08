import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    width: 'auto'
  }
});

export default function DenseTable(props) {
  const classes = useStyles();

  function createData(username, email, contact) {
    return { username, email, contact };
  }

  const rows = () =>
    props.data.map(({ username, email, contact }) =>
      createData(username, email, contact)
    );
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Contact&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows().map(row => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
