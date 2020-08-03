import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import ModeratorPasswordGeneratorField from '../../../../utils/ModeratorPwd/PasswordGeneratorField';
import ModeratorGroupsField from './ModeratorGroupsField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

const useStyles = makeStyles(theme => ({
  errorMessages: {
    color: 'red'
  }
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center'
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main
  // },
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1)
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2)
  // }
}));

const schema = yup.object().shape({
  moderator_name: yup.string().required('Moderator Name is required'),
  moderator_contact: yup
    .string()
    .required('Moderator Conact is required')
    .min(5)
});

export default function SignIn() {
  const classes = useStyles();
  const [moderatorPassword, setModeratorPassword] = useState();
  const [moderatorSelectedGroups, setModeratorSelectedGroups] = useState();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const handlePassword = PwdValue => {
    setModeratorPassword(PwdValue);
  };

  const handleSelectdGrops = selectedGroups => {
    setModeratorSelectedGroups(selectedGroups);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Moderator
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register()}
            required
            fullWidth
            label="Moderator name"
            name="moderator_name"
            autoFocus
          />
          <p className={classes.errorMessages}>
            {errors.moderator_name?.message}
          </p>

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register()}
            required
            fullWidth
            label="Moderator contact"
            name="moderator_contact"
            autoFocus
          />
          <p className={classes.errorMessages}>
            {errors.moderator_contact?.message}
          </p>

          <ModeratorPasswordGeneratorField onSetPassword={handlePassword} />
          <ModeratorGroupsField onSetGroups={handleSelectdGrops} />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(data => {
              console.log(data);
              console.log(moderatorPassword);
              console.log(moderatorSelectedGroups);
            })}>
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
