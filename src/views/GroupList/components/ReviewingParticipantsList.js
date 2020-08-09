import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({});

function createData(login, contact) {
  return { login, contact };
}

export default function DenseTable(props) {
  const classes = useStyles();

  const rows = () =>
    props.data.map(({ login, contact }) => createData(login, contact));
  return (
    <TableContainer overflow="auto">
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Login</TableCell>
            <TableCell align="right">Contact&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows().map(row => (
            <TableRow key={row.login}>
              <TableCell component="th" scope="row">
                {row.login}
              </TableCell>
              <TableCell align="right">{row.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
