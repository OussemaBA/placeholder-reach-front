import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Container,
  Grid,
  Link,
  TextField,
  Avatar,
  Button,
  Paper,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(12),

    flexGrow: 1
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="Group Details" {...a11yProps(0)} />
            <Tab label="Moderators List" {...a11yProps(1)} />
            <Tab label="Participants List" {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                GROUP DETAILS
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {'Don\'t have an account? Sign Up'}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Moderators List
        </TabPanel>
        <TabPanel value={value} index={2}>
          Participants List
        </TabPanel>
      </div>
    </>
  );
}
