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
    boxShadow: '5px 5px 5px #131417',
    margin: '2%',
    width: 300,
    height: 125
  },
  imageContainer: {
    height: 64,
    width: 64,

    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
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
        <Typography align="center" gutterBottom variant="h6">
          {Group.name}
        </Typography>
        <Typography align="center" variant="body1">
          {Group.desc.slice(0, 30) + '...'}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        {
          //theme Provider for customization
        }
        <ThemeProvider theme={theme}>
          <Grid container justify="space-between">
            <Grid className={classes.statsItem} item>
              <Button
                size="small"
                color="primary"
                onClick={ModelHandleClickOpen}>
                <Typography variant="subtitle2">View</Typography>
              </Button>
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
                  <Button autoFocus onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid className={classes.statsItem} item>
              <RouterLink to="/">
                <Button size="small" color="primary">
                  <Typography variant="subtitle2">Edit</Typography>
                </Button>
              </RouterLink>
            </Grid>
            <Grid className={classes.statsItem} item>
              <RouterLink to="/">
                <Button size="small" color="primary">
                  <Typography variant="subtitle2">Delete</Typography>
                </Button>
              </RouterLink>
            </Grid>
          </Grid>
        </ThemeProvider>
      </CardActions>
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
