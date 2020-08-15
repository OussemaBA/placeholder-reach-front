import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { snackbarErrorHandler } from '../../utils/snackbar';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { handleErrorToastr, handleSuccessToastr } from '../../utils/toastr';
import { Api } from '../../config/constants';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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
  question: yup.string().required(' Question field  is required'),
  description: yup.string().required(' Question field  is required'),
  question: yup.string().required(' Question field  is required')
});

const DiscussionsNewForm = props => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [choices, setChoices] = useState([]);
  const [qType, setQType] = useState([]);

  // discussion : {
  //   "creator_id" : "",
  //   "group_id" : "",
  //   "name" : "discussion 1",
  //   "desc" : "description",
  //   "img": "",
  //   "visible_to_group":true,
  //   "users_see_replies" : true,
  //   "replies" : [id]    }

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false
  });

  const { register, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(schema)
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submitData = async () => {
    setDisabled(true);

    const values = getValues();
    const dataTosubmit = {
      creator_id: null,
      group_id: props.group._id,
      name: values.name,
      desc: values.description,
      img: null,
      visible_to_group: state.checkedA,
      users_see_replies: state.checkedB,
      replies: 'unhidden'
    };

    try {
      await axios.post(`${Api.baseURL}/addDiscussion`, dataTosubmit);
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
        NEW Discussion
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
          label="Name"
          name="name"
          autoFocus
        />
        {snackbarErrorHandler(errors.name)}
        <TextField
          multiline
          rows={8}
          variant="outlined"
          margin="normal"
          inputRef={register()}
          required
          fullWidth
          label="Description"
          name="description"
          autoFocus
        />
        {snackbarErrorHandler(errors.description)}
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register()}
          required
          fullWidth
          label="Upload image"
          name="question"
          autoFocus
        />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        {/* {snackbarErrorHandler(errors.question)} */}

        <Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Discussion visible to group"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Users can see replies"
            />
          </Grid>
        </Grid>

        <Grid spacing={2}>
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={disabled}>
                <Typography variant="subtitle2">New Discussion</Typography>
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

export default DiscussionsNewForm;
