import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  languageSelector: {}
}));
const QuestionType = props => {
  const classes = useStyles();

  const [language, setlanguage] = useState('');
  const [open, setOpen] = useState(false);
  const [Type, setType] = useState('single');

  const handleChange = event => setType(event.target.value);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Typography variant="h6" className={classes.languageSelector}>
          Question Type
        </Typography>
      </Button>

      <Select
        className={classes.languageSelector}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={'single'}
        onChange={handleChange}>
        <MenuItem value={'single'}>
          <Typography variant="h6">single choice</Typography>
        </MenuItem>
        <MenuItem value={'multiple'}>
          <Typography variant="h6">multiple choices</Typography>
        </MenuItem>
      </Select>
    </>
  );
};

export default QuestionType;
