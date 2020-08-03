import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

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

import { SearchInput } from 'components';
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
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersToolbar = props => {
  const { className, ...rest } = props;

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
      <div>
        <Dialog
          onClose={ModelHandleClickClose}
          open={open}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <ParticipantNewForm />
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={ModelHandleClickClose} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
