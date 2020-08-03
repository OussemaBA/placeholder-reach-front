import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import BirthDayPicker from '../../utils/DatePicker';
import ParticipantPasswordGeneratorField from '../../utils/ModeratorPwd/PasswordGeneratorField';
import ParticipantGenderSelection from './ParticipantGenderSelection';
import ParticipantGroupsField from './ParticipantGroupsField';
import LoginIDGenerator from './LoginIDGenerator';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import axios from 'axios';
import { Api } from '../../config/constants';

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
  pseudo: yup.string().required('pseudo name is required'),
  placeOfLiving: yup.string().required('place of living is required'),
  Pcontact: yup.string().required(' Contact  is required')
});

const ParticipantNewForm = () => {
  const classes = useStyles();
  const [ParticipantPassword, setParticipantPassword] = useState();
  const [ParticipantSelectedGroups, setParticipantSelectedGroups] = useState();
  const [ParticipantBirthDay, setParticipantBirthDay] = useState();
  const [ParticipantGender, setParticipantGender] = useState();
  const [ParticipantID, setParticipantID] = useState();
  const { register, getValues, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const submitData = async () => {
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
    console.log('dataTosubmit:', dataTosubmit);
    // console.log(values);
    // console.log(ParticipantPassword);
    // console.log(ParticipantSelectedGroups);
    // console.log(ParticipantBirthDay);
    // console.log(ParticipantGender);
    // console.log(ParticipantID);
    const res = await axios.post(`${Api.baseURL}/register`, dataTosubmit);
    console.log('res', res);
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

        <LoginIDGenerator onSetLoginID={handleGeneratedLogin} />

        <form noValidate className={classes.form}>
          {/**Gender Picker */}

          <ParticipantGenderSelection onSelecGender={handleGenderSelection} />
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
          <p className={classes.errorMessages}>
            {errors.placeOfLiving?.message}
          </p>

          {/**Birthday Picker */}

          <BirthDayPicker onSelectDate={handleBirthdayDate} />

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
          <p className={classes.errorMessages}>{errors.Pcontact?.message}</p>
          {/**PASSWORD GENERATOR */}

          <ParticipantPasswordGeneratorField onSetPassword={handlePassword} />

          {/**PARTICIPANT GROUPS SELECTOR */}

          <ParticipantGroupsField
            className={classes.formFields}
            onSetGroups={handleSelectdGroups}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={submitData}>
            Create new User
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ParticipantNewForm;
