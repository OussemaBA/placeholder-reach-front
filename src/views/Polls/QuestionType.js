import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({}));

const QuestionType = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [Type, setType] = useState('single');

  useState(() => {
    props.questionType('single');
  }, []);

  const handleChange = event => {
    props.questionType(event.target.value);
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Typography variant="subtitle2" className={classes.languageSelector}>
          Question Type
        </Typography>
      </Button>

      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={Type}
        onChange={handleChange}>
        <MenuItem value={'single'}>
          <Typography variant="body2">single choice</Typography>
        </MenuItem>
        <MenuItem value={'multiple'}>
          <Typography variant="body2">multiple choices</Typography>
        </MenuItem>
      </Select>
    </>
  );
};

export default QuestionType;
