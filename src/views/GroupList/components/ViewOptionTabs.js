import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import {
  Tab,
  Divider,
  Box,
  Typography,
  Grid,
  Link,
  Dialog,
  DialogContent,
  Button
} from '@material-ui/core';
import ReviewingModeratorsList from './ReviewingModeratorsList';
import ReviewingParticipantsList from './ReviewingParticipantsList';
import ListingDataOf from './ListingDataOf';
import PropTypes from 'prop-types';
import ModeratorNewForm from '../../Moderators/components/ModeratorNewForm';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
  groupDescription: {
    marginBottom: theme.spacing(4),
    textAlign: 'justify',
    textJustify: 'inter-word'
  },
  ModeratorsList: {
    marginBottom: theme.spacing(2)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function ViewOptionTabs(props) {
  const { GroupData } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    {
      console.log('newValue:', newValue);
    }

    setValue(newValue);
  };
  const ModelHandleClickOpen = () => {
    setOpen(true);
  };

  const ModelHandleClickClose = () => {
    // we refrech  the moderators list table after adding new one
    //fetchModerators();
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          scrollButtons="on"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          textColor="primary">
          <Tab label="Description" value={0} />
          <Divider orientation="vertical" flexItem />
          <Tab label="Moderators " value={1} />
          <Divider orientation="vertical" flexItem />

          <Tab label="Participants " value={2} />
          <Divider orientation="vertical" flexItem />

          <Tab label="Polls" value={3} />
          <Divider orientation="vertical" flexItem />

          <Tab label="Discussions" value={4} />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <Grid item className={classes.groupDescription}>
          <Typography> {GroupData?.desc}</Typography>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          // Moderators list
        }

        <Grid
          container
          className={classes.ModeratorsList}
          justify="flex-start"
          alignItems="center">
          <Grid item>
            <Typography className={classes.secondaryHeading}>
              Total :
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.total}>
              {GroupData?.moderators.length}
            </Typography>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={ModelHandleClickOpen}>
              <Grid
                style={{ marginLeft: '20px' }}
                container
                alignItems="center"
                justify="flex-start">
                <Grid item style={{ marginRight: '8px' }}>
                  <PersonAddIcon />
                </Grid>
                <Grid item>New Moderator</Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
        <ReviewingModeratorsList data={GroupData?.moderators} />

        {
          //Moderator Modal
        }

        <Dialog
          onClose={ModelHandleClickClose}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <ModeratorNewForm
              group={GroupData}
              CloseModal={ModelHandleClickClose}
            />
          </DialogContent>
        </Dialog>
      </TabPanel>

      <TabPanel value={value} index={2}>
        {
          // Participants list
        }
        <Grid container>
          <Grid item xs>
            <Typography className={classes.secondaryHeading}>
              Participants
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.total}>
              {GroupData?.participants.length}
            </Typography>
          </Grid>
        </Grid>
        <ReviewingParticipantsList data={props.GroupData?.participants} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        {
          // Polls
        }
        <Grid container>
          <Grid item xs>
            <Typography className={classes.secondaryHeading}>Polls</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.total}>
              {GroupData?.polls.length}
            </Typography>
          </Grid>
          <ListingDataOf polls={GroupData.polls} />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        {
          // DISCUSSIONS
        }
        <Grid container>
          <Grid item xs>
            <Typography className={classes.secondaryHeading}>
              Discussions
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.total}>
              {GroupData?.discussions.length}
            </Typography>
          </Grid>
          <ListingDataOf discussions={GroupData.discussions} />
        </Grid>
      </TabPanel>
    </>
  );
}
