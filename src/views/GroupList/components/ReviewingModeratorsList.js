import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: 'auto'
  }
});

export default function ReviewingModeratorsList(props) {
  const classes = useStyles();

  function createData(username, email) {
    return { username, email };
  }

  const rows = () =>
    props.data?.map(({ username, email }) => createData(username, email));
  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <Paper elevation={3}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows()?.map(row => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Paper>
    </Table>
  );
}
