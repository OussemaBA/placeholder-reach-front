import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { snackbarErrorHandler } from '../../../utils/snackbar';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
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
  grp_name: yup.string().required('Groupe name is required'),
  grp_desc: yup.string().required('Group description is required')
});

export default function GroupInfos(props) {
  const classes = useStyles();
  const { register, errors, formState, getValues, setValue } = useForm({
    mode: 'onChange',

    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setValue('grp_name', props?.grpName, { shouldDirty: true });
    setValue('grp_desc', props?.grpDesc, { shouldDirty: true });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Group name and description
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({ required: true })}
            required
            fullWidth
            label="Group name"
            name="grp_name"
            autoFocus
            onChange={() => {
              return props.onChangeFormValidation(
                formState.isValid,
                'grpName',
                getValues('grp_name')
              );
            }}
          />
          {snackbarErrorHandler(errors.grp_name)}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({ required: true })}
            required
            fullWidth
            label="Group Description"
            name="grp_desc"
            autoFocus
            multiline
            rows={8}
            onChange={() => {
              return props.onChangeFormValidation(
                formState.isValid,
                'grpDesc',
                getValues('grp_desc')
              );
            }}
          />
          {snackbarErrorHandler(errors.grp_desc)}
        </form>
      </div>
    </Container>
  );
}
