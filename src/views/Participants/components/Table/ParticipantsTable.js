import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import {
  handleErrorToastr,
  handleSuccessToastr
} from '../../../../utils/toastr';
import { Api } from '../../../../config/constants';
import axios from 'axios';
import { fetchParticipants } from '../../../../actions';
import { connect } from 'react-redux';
import {
  TableContainer,
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Box,
  IconButton
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },

  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },

  actions: {
    justifyContent: 'flex-end'
  },
  TableCell: {
    whiteSpace: 'nowrap'
  }
}));

const ParticipantsTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {}, [users.length]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleDelete = async id => {
    try {
      await axios.put(`${Api.baseURL}/hide_unhide_User/${id}`, {
        state: 'inactive'
      });

      users.filter(user => user._id !== id);
    } catch (error) {
      if (error.message === 'Network Error') {
        handleErrorToastr(error.message, () => {});
      }
      return Error();
    }

    handleSuccessToastr('Participant deleted successfully', () => {});
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.TableCell}>username</TableCell>
                <TableCell className={classes.TableCell}>Login(ID)</TableCell>
                <TableCell className={classes.TableCell}>
                  Contact number
                </TableCell>
                <TableCell className={classes.TableCell}>
                  Place of living
                </TableCell>

                <TableCell className={classes.TableCell}>
                  Date of birth
                </TableCell>
                <TableCell className={classes.TableCell}>Gender</TableCell>
                <TableCell className={classes.TableCell}>state</TableCell>

                <TableCell>Joined at </TableCell>
                <TableCell className={classes.TableCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => {
                  if (user.state === 'active')
                    return (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user._id}
                        selected={selectedUsers.indexOf(user._id) !== -1}>
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Typography variant="body1">
                              {user.username}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: '#2F90DE' }}>
                          {user.login}
                        </TableCell>

                        <TableCell>{user.contact}</TableCell>
                        <TableCell>{user.living}</TableCell>
                        <TableCell>
                          {moment(user.birth_date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>{user.state}</TableCell>

                        <TableCell>
                          {moment(user.created_at).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                          <Box display="flex">
                            <IconButton>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(user._id)}>
                              <HighlightOffIcon
                                fontSize="small"
                                style={{
                                  color: red[500]
                                }}
                              />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage={''}
        />
      </CardActions>
    </Card>
  );
};

ParticipantsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({ participants }) => ({
  participants
});

export default connect(mapStateToProps, { fetchParticipants })(
  ParticipantsTable
);
