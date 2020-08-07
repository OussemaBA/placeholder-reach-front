import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { fetchModerators } from '../../../actions';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Box, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import ModeratorPasswordGeneratorField from '../../../utils/Pwd/PasswordGeneratorField';
import { snackbarErrorHandler } from '../../../utils/snackbar';
import ModeratorGroupsSelector from '../../../utils/GroupsSelector';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { handleErrorToastr, handleSuccessToastr } from '../../../utils/toastr';
import { Api } from '../../../config/constants';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

const schema = yup.object().shape({
  moderator_name: yup.string().required('Moderator Name is required'),
  moderator_email: yup
    .string()
    .email()
    .required('Moderator Name is required'),
  moderator_contact: yup.string().required('Moderator contact is required')
});

const ModeratorNewForm = props => {
  const classes = useStyles();
  const [moderatorPassword, setModeratorPassword] = useState();
  const [moderatorSelectedGroups, setModeratorSelectedGroups] = useState();
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(schema)
  });

  const submitData = async () => {
    setDisabled(true);
    const values = getValues();

    const dataTosubmit = {
      username: values.moderator_name,
      role: 'moderator',
      email: values.moderator_email,
      password: moderatorPassword,
      groupes: moderatorSelectedGroups,
      contact: values.moderator_contact,
      state: 'active'
    };

    console.log('dataTosubmit:', dataTosubmit);

    try {
      await axios.post(`${Api.baseURL}/register`, dataTosubmit);
    } catch (error) {
      if (error.message == 'Network Error') {
        handleErrorToastr(error.message, () => props.CloseModal());
      }
      return Error();
    }

    handleSuccessToastr('Moderator  created successfully', () => {
      props.CloseModal();
    });
  };

  const handlePassword = PwdValue => {
    setModeratorPassword(PwdValue);
  };

  const handleSelectdGroups = selectedGroups => {
    setModeratorSelectedGroups(selectedGroups);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Moderator
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(submitData)}
          noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register()}
            required
            fullWidth
            label="name"
            name="moderator_name"
            autoFocus
          />
          {snackbarErrorHandler(errors.moderator_name)}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register()}
            required
            fullWidth
            label="Email"
            name="moderator_email"
            autoFocus
          />
          {snackbarErrorHandler(errors.moderator_email)}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register()}
            required
            fullWidth
            label="Contact Number"
            name="moderator_contact"
            autoFocus
          />
          {snackbarErrorHandler(errors.moderator_contact)}
          <ModeratorPasswordGeneratorField onSetPassword={handlePassword} />
          <ModeratorGroupsSelector
            className={classes.formFields}
            onSetGroups={handleSelectdGroups}
          />
          <Grid spacing={2}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Box p={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={disabled}>
                  Create new Moderator
                </Button>
              </Box>
              <Box p={1}>
                <Button fullWidth color="secondary" onClick={props.CloseModal}>
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

export default ModeratorNewForm;
