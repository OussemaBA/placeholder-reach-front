import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Backdrop
} from '@material-ui/core';
import { fetchModerators, fetchGroups } from '../../../../actions';
import { connect } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Review from '../Review';
import DialogContent from '@material-ui/core/DialogContent';
import ViewOptionTabs from '../ViewOptionTabs';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f50a68'
    },
    secondary: {
      main: '#11cb5f'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: '2%',
    width: 300,
    height: 125
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  typographyItem: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1)
    color: '#c49d7c'
  }
}));

const GroupCard = props => {
  const { className, Group, ...rest } = props;
  const [open, setOpen] = useState(false);

  const ModelHandleClickOpen = () => {
    setOpen(true);
  };

  const ModelHandleClickClose = () => {
    props.fetchGroups();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <Card {...rest} className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {Group.name}
                </Typography>
                <Typography variant="body1">
                  {Group.desc.slice(0, 20) + '...'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.typographyItem}>
                Participants: {Group.participants.length}
              </Typography>
              <Typography variant="body2" className={classes.typographyItem}>
                Moderators: {Group.moderators.length}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        {
          //theme Provider for customization
        }
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Button size="small">
              <Typography
                color="primary"
                variant="h6"
                onClick={ModelHandleClickOpen}>
                View
              </Typography>
            </Button>
          </Grid>
          <Grid className={classes.statsItem} item>
            <RouterLink to="/">
              <Button size="small">
                <Typography color="primary" variant="h6">
                  Edit
                </Typography>
              </Button>
            </RouterLink>
          </Grid>
          <Grid className={classes.statsItem} item>
            <RouterLink to="/">
              <Button size="small">
                <Typography color="primary" variant="h6">
                  Delete
                </Typography>
              </Button>
            </RouterLink>
          </Grid>
        </Grid>
      </CardActions>
      {
        //View Dialog
      }
      <Dialog
        fullScreen
        onClose={ModelHandleClickClose}
        open={open}
        scroll={'paper'}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography align="center" variant="h6" gutterBottom>
            {Group?.name}
          </Typography>
        </DialogTitle>

        <ViewOptionTabs GroupData={Group} />
        <DialogActions>
          <Button size="small">
            <Typography
              color="primary"
              variant="h6"
              onClick={ModelHandleClickClose}>
              Close
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      {
        // END View Dialog
      }
    </Card>
  );
};

GroupCard.propTypes = {
  className: PropTypes.string,
  Group: PropTypes.object.isRequired
};

const mapStateToProps = ({ groups }) => ({
  groups
});

export default connect(mapStateToProps, { fetchGroups })(GroupCard);
