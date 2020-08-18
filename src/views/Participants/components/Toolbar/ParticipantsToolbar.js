import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography
} from '@material-ui/core';
import { fetchParticipants } from '../../../../actions';
import { connect } from 'react-redux';
import ParticipantNewForm from '../ParticipantNewForm';
import CSVExport from '../../../../utils/CSVExport/CSVExport';
import CSVImport from '../../../../utils/CSVImport/CSVImport';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  Dialog: { marginBottom: '50px' }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParticipantsToolbar = props => {
  const { className, fetchParticipants, participants, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const ModelHandleClickOpen = () => {
    setOpen(true);
  };

  const ModelHandleClickClose = () => {
    // we refrech  the moderators list table after adding new one

    fetchParticipants();
    setOpen(false);
  };

  const headers = [
    { key: 'username', label: 'User name' },
    { key: 'login', label: 'Login' },
    { key: 'contact', label: 'Contact number' },
    { key: 'living', label: 'Place of living' },
    { key: 'birth_date', label: 'Date of birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'created_at', label: 'Joined at' }
  ];
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <CSVImport />
        <Button className={classes.exportButton}>
          <CSVExport
            data={props.data}
            headers={headers}
            filename={'Participants.csv'}
          />
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={ModelHandleClickOpen}>
          <h5> New Participant</h5>
        </Button>
      </div>
      <Dialog
        onClose={ModelHandleClickClose}
        open={open}
        className={classes.Dialog}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <ParticipantNewForm CloseModal={ModelHandleClickClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

ParticipantsToolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = ({ participants }) => ({
  participants
});

export default connect(mapStateToProps, { fetchParticipants })(
  ParticipantsToolbar
);
