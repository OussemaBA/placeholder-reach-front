import React, { useState } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { default as ModeratorsList } from '../GroupList/components/DataList';
import GroupsCreateNewForm from '../GroupList/components/GroupsCreateNewForm';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Slide, IconButton, Button, Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ParticipantNewForm from './ParticipantNewForm';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NestedList() {
  const dataModerators = [1, 2, 3, 4, 5, 6];
  const dataModeratorsExist = [811, 287];
  const [open, setOpen] = React.useState(false);

  const [openModel, setOpenModel] = useState(false);

  const ModelHandleClickOpen = () => {
    setOpenModel(true);
  };

  const ModelHandleClickClose = () => {
    setOpenModel(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="nav">
      <ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Participants" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <ListItem
          button
          onClick={ModelHandleClickOpen}
          style={{ maxWidth: '60px' }}>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
        </ListItem>
        <Dialog
          open={openModel}
          onClose={ModelHandleClickClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <ParticipantNewForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={ModelHandleClickClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <ListItem>
            <ModeratorsList left={dataModerators} right={dataModeratorsExist} />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
