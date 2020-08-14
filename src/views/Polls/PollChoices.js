import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },

  textField: { maxWidth: '170px' },
  answers: { marginTop: theme.spacing(2) }
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const initialState = [];
  const [choices, setChoices] = React.useState(initialState);
  const [value, setValue] = React.useState('');

  const deleteAnwserHandler = index => {
    choices.splice(index, 1);

    props.pollChoices([...choices]);
    setChoices([...choices]);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };
  const AddAnwserHandler = () => {
    choices.splice(0, 0, value);
    props.pollChoices([...choices]);
    setChoices([...choices]);
  };
  const renderChoices = () => (
    <List>
      {choices.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={index} dense>
            <ListItemText id={labelId} primary={value} />
            <ListItemSecondaryAction onClick={() => deleteAnwserHandler(index)}>
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      <Grid container alignContent="center" justify="flex-start">
        <TextField
          className={classes.textField}
          id="outlined-disabled"
          label="Disabled"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />

        <IconButton aria-label="delete" onClick={() => AddAnwserHandler()}>
          <AddCircleIcon />
        </IconButton>
        <Typography variant="subtitle2" className={classes.answers}>
          Answers:
        </Typography>
        {renderChoices()}
      </Grid>
    </>
  );
}
