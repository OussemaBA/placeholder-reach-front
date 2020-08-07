import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import randomize from 'randomatic';
import { fetchParticipants } from '../../../actions';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  formFields: {
    marginTop: '10px'
  }
}));

const LoginIDGenerator = props => {
  const classes = useStyles();
  const { participants, fetchParticipants } = props;

  const [partData, setPartData] = useState(undefined);
  const [LoginID, setLoginID] = useState(null);

  const generatePwd = () => {
    if (partData) {
      const IDs = partData.map(participant => participant.email);
      let newID;

      do {
        newID = randomize('0', 6);
      } while (Object.values(IDs).includes(newID) === true);

      setLoginID(newID);
      props.onSetLoginID(newID);
    }
  };

  const renderIDField = () => {
    if (!LoginID) return <CircularProgress color="secondary" />;
    return (
      <OutlinedInput
        value={LoginID}
        endAdornment={
          <InputAdornment position="end">
            <Button
              onClick={event => {
                event.preventDefault();
                generatePwd();
              }}
              readOnly
              variant="contained"
              size="small"
              color="primary">
              new ID
            </Button>
          </InputAdornment>
        }
      />
    );
  };

  useEffect(() => {
    fetchParticipants();
    setPartData(participants.participants);

    generatePwd();
  }, [partData]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl fullWidth variant="outlined" className={classes.formFields}>
        {renderIDField()}
      </FormControl>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ participants }) => ({
  participants
});

export default connect(mapStateToProps, { fetchParticipants })(
  LoginIDGenerator
);
