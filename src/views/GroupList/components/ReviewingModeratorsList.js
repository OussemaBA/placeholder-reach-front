import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { handleErrorToastr } from '../../../utils/toastr';
import { Api } from '../../../config/constants';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    width: 'auto'
  }
});
export default function ReviewingModeratorsList(props) {
  const classes = useStyles();
  const [data, setData] = React.useState({});

  function createData(username, email) {
    return { username, email };
  }

  const rows = () =>
    props.data.map(async _id => {
      let res;
      try {
        res = await axios.get(`${Api.baseURL}/getUser/${_id}`);
      } catch (error) {
        if (error.message == 'Network Error') {
          handleErrorToastr(error.message, () => props.CloseModal());
        }
        return Error();
      }
      const { email, username } = res;
      return createData(username, email);
    });

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
