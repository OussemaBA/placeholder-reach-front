/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { SearchInput } from 'components';
import GroupsCreateNewForm from '../GroupsCreateNewForm';

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
  dialogContent: {
    width: '100%'
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

const GroupsToolbar = props => {
  const { className, ...rest } = props;
  const [open, setOpen] = useState(false);

  const ModelHandleClickOpen = () => {
    setOpen(true);
  };

  const ModelHandleClickClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          onClick={ModelHandleClickOpen}
          variant="contained">
          ADD Group
        </Button>
        <div>
          <Dialog
            fullScreen
            onClose={ModelHandleClickClose}
            open={open}
            TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  edge="start"
                  onClick={ModelHandleClickClose}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <GroupsCreateNewForm />
          </Dialog>
        </div>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search for a Group"
        />
      </div>
    </div>
  );
};

GroupsToolbar.propTypes = {
  className: PropTypes.string
};

export default GroupsToolbar;
