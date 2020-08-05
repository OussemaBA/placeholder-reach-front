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
  Slide
} from '@material-ui/core';
import { fetchParticipants } from '../../../../actions';
import { connect } from 'react-redux';
import ParticipantNewForm from '../../../Participants/ParticipantNewForm';

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
    setOpen(false);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={ModelHandleClickOpen}>
          {props.whatToAdd}
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
