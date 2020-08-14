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

export default function DenseTable(props) {
  const classes = useStyles();

  function createData(login, contact) {
    return { login, contact };
  }

  const rows = () =>
    props.data?.map(({ login, contact }) => createData(login, contact));
  return (
    <Table
      fullwidth
      className={classes.table}
      size="small"
      aria-label="a dense table">
      <Paper elevation={3}>
        <TableHead>
          <TableRow>
            <TableCell>Login</TableCell>
            <TableCell align="right">Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows()?.map(row => (
            <TableRow key={row.login}>
              <TableCell component="th" scope="row">
                {row.login}
              </TableCell>
              <TableCell align="right">{row.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Paper>
    </Table>
  );
}
