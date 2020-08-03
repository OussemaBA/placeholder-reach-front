import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { handleErrorToastr, handleInfoToastr } from '../../utils/toastr';
import { useHistory } from 'react-router-dom';
import { errorMsg, infoMsg, routes } from '../../config/constants';
import Cookies from 'universal-cookie';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import withCookies from '../../HOC/withCookies';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../../actions';
import { compose } from 'recompose';
import { Api } from '../../config/constants';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: '50px'
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
  },
  errorMessages: {
    color: 'red'
  }
}));

const schema = yup.object().shape({
  email: yup.string().required('ID is required'),
  password: yup
    .string()
    .required('Password is required')
    .length(5)
});

const Login = props => {
  const history = useHistory();

  const classes = useStyles();
  const { t, i18n, changeL, c_role, c_token } = props;
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  /**Language Hanlding */
  useEffect(() => {
    changeL(props.language.language);
    i18n.changeLanguage(props.c_language);
  }, [props.c_language]);

  /**Login HANDLER */
  const CheckUserLogin = async () => {
    if (c_role && c_token) {
      console.log('user exit');
      history.push(routes.DASHBOARD);
    } else {
      handleInfoToastr(infoMsg.registerUser);
    }
  };

  useEffect(() => {
    CheckUserLogin();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('loginForm.label')}
        </Typography>
        <form className={classes.form}>
          <TextField
            inputRef={register()}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('loginForm.username.label')}
            name="email"
            autoFocus
          />
          <p className={classes.errorMessages}>{errors.email?.message}</p>
          <TextField
            inputRef={register()}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('loginForm.password.label')}
            type="password"
          />
          <p className={classes.errorMessages}>{errors.password?.message}</p>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(async data => {
              const res = await axios.post(`${Api.baseURL}/login`, {
                email: data.email,
                password: data.password
              });

              const { role } = res.data.user;

              const { token } = res.data.access_token;

              const cookieValue = {
                language: 'en',
                direction: 'ltr',
                role,
                token
              };

              cookies.set('userCookies', cookieValue, { path: '' });
            })}
            className={classes.submit}>
            {t('loginForm.submit')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    changeL: lang => dispatch(changeLanguage(lang))
  };
}

const mapStateToProps = state => ({
  language: state.language
});

export default compose(
  withCookies,
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('common')
)(Login);
