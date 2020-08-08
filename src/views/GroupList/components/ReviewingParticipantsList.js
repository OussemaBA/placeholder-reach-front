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

function createData(login, gender, contact, living, birth_date) {
  return { login, gender, contact, living, birth_date };
}

export default function DenseTable(props) {
  const classes = useStyles();

  const rows = () =>
    props.data.map(({ login, gender, contact, living, birth_date }) =>
      createData(login, gender, contact, living, birth_date)
    );
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Login</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Contact&nbsp;</TableCell>
            <TableCell align="right">Living&nbsp;</TableCell>
            <TableCell align="right">Birth date&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows().map(row => (
            <TableRow key={row.login}>
              <TableCell component="th" scope="row">
                {row.login}
              </TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.contact}</TableCell>
              <TableCell align="right">{row.living}</TableCell>
              <TableCell align="right">
                {moment(row.birth_date).format('DD/MM/YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
