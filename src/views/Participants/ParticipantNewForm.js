import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Grid, Box } from '@material-ui/core';

import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import BirthDayPicker from '../../utils/DatePicker';
import ParticipantPasswordGeneratorField from '../../utils/Pwd/PasswordGeneratorField';
import ParticipantGenderSelection from './ParticipantGenderSelection';
import ParticipantGroupsField from './ParticipantGroupsField';
import LoginIDGenerator from './LoginIDGenerator';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { handleInfoToastr, handleErrorToastr } from '../../utils/toastr';
import { snackbarErrorHandler } from '../../utils/snackbar';
import { Api } from '../../config/constants';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  errorMessages: {
    color: 'red'
  },
  formFields: {
    marginTop: '10px'
  },
  formTitle: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

const schema = yup.object().shape({
  placeOfLiving: yup.string().required('place of living is required'),
  Pcontact: yup.string().required(' Contact  is required')
});

const ParticipantNewForm = props => {
  const classes = useStyles();
  const [ParticipantPassword, setParticipantPassword] = useState();
  const [ParticipantSelectedGroups, setParticipantSelectedGroups] = useState();
  const [ParticipantBirthDay, setParticipantBirthDay] = useState();
  const [ParticipantGender, setParticipantGender] = useState();
  const [ParticipantID, setParticipantID] = useState();
  const [disabled, setDisabled] = useState(false);
  const { register, getValues, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const submitData = async () => {
    setDisabled(true);
    const values = getValues();

    const dataTosubmit = {
      username: 'staticForAllUsers',
      role: 'participant',
      login: ParticipantID,
      password: ParticipantPassword,
      groupes: ParticipantSelectedGroups,
      contact: values.Pcontact,
      living: values.placeOfLiving,
      birth_date: ParticipantBirthDay,
      state: 'active',
      gender: ParticipantGender
    };

    try {
      await axios.post(`${Api.baseURL}/register`, dataTosubmit);
    } catch (error) {
      if (error.message == 'Network Error') {
        handleErrorToastr(error.message, () => props.CloseModal());
      }
      return Error();
    }

    handleInfoToastr('Participant created successfully', () =>
      props.CloseModal()
    );
  };

  const handleGenderSelection = gender => {
    setParticipantGender(gender);
  };
  const handleBirthdayDate = date => {
    setParticipantBirthDay(date);
  };

  const handlePassword = PwdValue => {
    setParticipantPassword(PwdValue);
  };

  const handleGeneratedLogin = LoginID => {
    setParticipantID(LoginID);
  };

  const handleSelectdGroups = selectedGroups => {
    setParticipantSelectedGroups(selectedGroups);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography className={classes.formTitle} variant="h5">
          Create New Participant
        </Typography>

        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(submitData)}>
          <LoginIDGenerator onSetLoginID={handleGeneratedLogin} />

          {/**Place of Living */}
          <TextField
            className={classes.formFields}
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            label="Place of Living"
            name="placeOfLiving"
            autoFocus
          />
          {snackbarErrorHandler(errors.placeOfLiving)}

          {/**Contact Number */}
          <TextField
            className={classes.formFields}
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            label="Contact Number"
            name="Pcontact"
            autoFocus
          />

          {snackbarErrorHandler(errors.Pcontact)}

          {/**Gender Picker */}
          <ParticipantGenderSelection onSelecGender={handleGenderSelection} />
          {/**Birthday Picker */}
          <BirthDayPicker onSelectDate={handleBirthdayDate} />
          {/**PASSWORD GENERATOR */}
          <ParticipantPasswordGeneratorField onSetPassword={handlePassword} />
          {/**PARTICIPANT GROUPS SELECTOR */}
          <ParticipantGroupsField
            className={classes.formFields}
            onSetGroups={handleSelectdGroups}
          />

          <Grid container spacing={2} className={classes.formTitle}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Box p={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={disabled}>
                  Create new User
                </Button>
              </Box>
              <Box p={1}>
                <Button
                  fullWidth
                  color="secondary"
                  type="submit"
                  onClick={props.CloseModal}>
                  Close
                </Button>
              </Box>
            </Box>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ParticipantNewForm;
