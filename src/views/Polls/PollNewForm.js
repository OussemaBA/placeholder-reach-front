import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Box, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { snackbarErrorHandler } from '../../utils/snackbar';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { handleErrorToastr, handleSuccessToastr } from '../../utils/toastr';
import { Api } from '../../config/constants';
import axios from 'axios';
import QuestionType from './QuestionType';
import PollChoices from './PollChoices';

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
  question: yup.string().required(' Question field  is required')
});

const PollNewForm = props => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [choices, setChoices] = useState([]);
  const [qType, setQType] = useState([]);
  const { register, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(schema)
  });

  const handeQuestiontype = QType => {
    setQType(QType);
  };

  const handleChoices = choices => {
    setChoices(choices);
  };

  const submitData = async () => {
    setDisabled(true);

    const values = getValues('question');
    const dataTosubmit = {
      group_id: props.group._id,
      type: qType,
      question: values,
      answers: [],
      answerers_id: [],
      choices: choices,
      state: 'unhidden'
    };

    try {
      let res = await axios.post(`${Api.baseURL}/addPoll`, dataTosubmit);
    } catch (error) {
      if (error.message == 'Network Error') {
        handleErrorToastr(error.message, () => props.CloseModal());
      }
      return Error();
    }

    handleSuccessToastr('Poll created successfully', () => {
      props.CloseModal();
    });
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        NEW POLL
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit(submitData)}
        noValidate>
        <QuestionType questionType={handeQuestiontype} />

        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register()}
          required
          fullWidth
          label="Question"
          name="question"
          autoFocus
        />
        {snackbarErrorHandler(errors.question)}

        <PollChoices pollChoices={handleChoices} />
        <Grid spacing={2}>
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={disabled}>
                <Typography variant="subtitle2">New Poll</Typography>
              </Button>
            </Box>
            <Box p={1}>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                onClick={props.CloseModal}>
                Close
              </Button>
            </Box>
          </Box>
        </Grid>
      </form>
    </div>
  );
};

export default PollNewForm;
