import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Divider, Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReviewingParticipantsList from './ReviewingParticipantsList';
import ReviewingModeratorsList from './ReviewingModeratorsList';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  },
  groupDescription: {
    marginBottom: theme.spacing(4)
  },
  grpName: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Review(props) {
  const classes = useStyles();
  const { GroupData } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom className={classes.title}>
          Group details
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Typography>
            {' '}
            <h4>Group Name :&nbsp;&nbsp;</h4>{' '}
          </Typography>
        </Grid>
      </Grid>
      <Grid item className={classes.grpName}>
        <Typography>{GroupData.grpName}</Typography>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Typography>
            {' '}
            <h4>Group Description :&nbsp;&nbsp;</h4>{' '}
          </Typography>
        </Grid>

        <Grid item className={classes.groupDescription}>
          <Typography> {GroupData.grpDesc}</Typography>
        </Grid>
      </Grid>
      <Grid item container direction="column">
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.secondaryHeading}>
                  Moderators list
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" className={classes.total}>
                  {props.GroupData.moderators.length}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              <ReviewingModeratorsList data={props.GroupData.moderators} />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.secondaryHeading}>
                  Participants list
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" className={classes.total}>
                  {props.GroupData.participants.length}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              <ReviewingParticipantsList data={props.GroupData.participants} />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </React.Fragment>
  );
}
