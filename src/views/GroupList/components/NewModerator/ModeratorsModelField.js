import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { default as ModeratorsList } from '../DataList';
import { makeStyles } from '@material-ui/styles';
import { Toolbar, Slide, IconButton, Button, Dialog } from '@material-ui/core';
import ModeratorNewForm from './ModeratorNewForm';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
          <ListItemText primary="Moderators" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <ListItem button onClick={ModelHandleClickOpen}>
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
            <ModeratorNewForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={ModelHandleClickClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItem>
            <ModeratorsList left={dataModerators} right={dataModeratorsExist} />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
