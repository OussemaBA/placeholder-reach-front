import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogContent, Slide } from '@material-ui/core';
import { fetchModerators } from '../../../../actions';
import { connect } from 'react-redux';
import { ModeratorNewForm } from '..';
import CSVExport from '../../../../utils/CSVExport/CSVExport';
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

const ModeratorsToolbar = props => {
  const { className, fetchModerators, moderators, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const ModelHandleClickOpen = () => {
    setOpen(true);
  };

  const ModelHandleClickClose = () => {
    // we refrech  the moderators list table after adding new one
    fetchModerators();
    setOpen(false);
  };

  const headers = [
    { key: 'username', label: 'User name' },
    { key: 'contact', label: 'Contact number' },
    { key: 'email', label: 'Email' },

    { key: 'birth_date', label: 'Date of birth' },
    { key: 'created_at', label: 'Joined at' }
  ];

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>
          <CSVExport
            data={props.data}
            headers={headers}
            filename={'Moderators.csv'}
          />
        </Button>
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
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <ModeratorNewForm CloseModal={ModelHandleClickClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

ModeratorsToolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = ({ moderators }) => ({
  moderators
});

export default connect(mapStateToProps, { fetchModerators })(ModeratorsToolbar);
